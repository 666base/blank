import {
  type DocClock,
  type DocClocks,
  type DocRecord,
  DocStorageBase,
  type DocStorageOptions,
  type DocUpdate,
} from '../../storage';
import {
  base64ToBytes,
  BlankSupabaseConnection,
  type BlankSupabaseStorageOpts,
  byteaHexToBytes,
  bytesToBase64,
  bytesToByteaHex,
} from './connection';

export type SupabaseDocStorageOptions = DocStorageOptions &
  BlankSupabaseStorageOpts;

type DocUpdateRow = {
  id: number;
  doc_id: string;
  update: string;
  created_at: string;
  client_id: string | null;
};

type DocSnapshotRow = {
  doc_id: string;
  state: string;
  updated_at: string;
  client_id: string | null;
};

/**
 * Remote Yjs doc storage backed by Blank Supabase tables
 * `doc_updates` + `doc_snapshots` with Realtime fan-out.
 */
export class SupabaseDocStorage extends DocStorageBase<SupabaseDocStorageOptions> {
  static readonly identifier = 'SupabaseDocStorage';

  readonly connection = new BlankSupabaseConnection(this.options);

  private channel: ReturnType<
    BlankSupabaseConnection['inner']['client']['channel']
  > | null = null;

  private realtimeStarted = false;

  private get clientId() {
    return this.options.clientId ?? 'blank-client';
  }

  override async pushDocUpdate(
    update: DocUpdate,
    origin?: string
  ): Promise<DocClock> {
    this.ensureRealtime();
    const { client, ownerId, workspaceId } = this.connection.inner;
    const createdAt = new Date();

    const { error } = await client.from('doc_updates').insert({
      doc_id: update.docId,
      workspace_id: workspaceId,
      owner_id: ownerId,
      update: bytesToByteaHex(update.bin),
      created_at: createdAt.toISOString(),
      client_id: this.clientId,
    });

    if (error) {
      throw new Error(`SupabaseDocStorage.pushDocUpdate: ${error.message}`);
    }

    const record: DocRecord = {
      docId: update.docId,
      bin: update.bin,
      timestamp: createdAt,
      editor: update.editor,
    };

    this.emit('update', record, origin);

    try {
      await client.channel(`doc:${workspaceId}:${update.docId}`).send({
        type: 'broadcast',
        event: 'doc_update',
        payload: {
          docId: update.docId,
          update: bytesToBase64(update.bin),
          timestamp: createdAt.toISOString(),
          clientId: this.clientId,
          editor: update.editor,
        },
      });
    } catch {
      // Postgres changes remain the catch-up path.
    }

    return { docId: update.docId, timestamp: createdAt };
  }

  override async getDocTimestamp(docId: string): Promise<DocClock | null> {
    const { client, workspaceId } = this.connection.inner;

    const { data: snap } = await client
      .from('doc_snapshots')
      .select('updated_at')
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId)
      .maybeSingle();

    const { data: upd } = await client
      .from('doc_updates')
      .select('created_at')
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const times = [snap?.updated_at, upd?.created_at]
      .filter(Boolean)
      .map(t => new Date(t as string).getTime());

    if (!times.length) {
      return null;
    }

    return { docId, timestamp: new Date(Math.max(...times)) };
  }

  override async getDocTimestamps(after?: Date): Promise<DocClocks> {
    const { client, workspaceId } = this.connection.inner;
    const clocks: DocClocks = {};

    let snapQuery = client
      .from('doc_snapshots')
      .select('doc_id, updated_at')
      .eq('workspace_id', workspaceId);
    if (after) {
      snapQuery = snapQuery.gt('updated_at', after.toISOString());
    }
    const { data: snaps } = await snapQuery;
    for (const row of snaps ?? []) {
      clocks[row.doc_id] = new Date(row.updated_at);
    }

    let updQuery = client
      .from('doc_updates')
      .select('doc_id, created_at')
      .eq('workspace_id', workspaceId);
    if (after) {
      updQuery = updQuery.gt('created_at', after.toISOString());
    }
    const { data: upds } = await updQuery;
    for (const row of upds ?? []) {
      const ts = new Date(row.created_at);
      const prev = clocks[row.doc_id];
      if (!prev || ts > prev) {
        clocks[row.doc_id] = ts;
      }
    }

    return clocks;
  }

  override async deleteDoc(docId: string): Promise<void> {
    const { client, workspaceId } = this.connection.inner;
    await client
      .from('doc_updates')
      .delete()
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId);
    await client
      .from('doc_snapshots')
      .delete()
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId);
  }

  protected override async getDocSnapshot(
    docId: string
  ): Promise<DocRecord | null> {
    this.ensureRealtime();
    const { client, workspaceId } = this.connection.inner;
    const { data, error } = await client
      .from('doc_snapshots')
      .select('doc_id, state, updated_at, client_id')
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId)
      .maybeSingle();

    if (error) {
      throw new Error(`SupabaseDocStorage.getDocSnapshot: ${error.message}`);
    }
    if (!data) {
      return null;
    }

    const row = data as DocSnapshotRow;
    return {
      docId: row.doc_id,
      bin: byteaHexToBytes(row.state),
      timestamp: new Date(row.updated_at),
    };
  }

  protected override async setDocSnapshot(
    snapshot: DocRecord,
    _prev: DocRecord | null
  ): Promise<boolean> {
    const { client, ownerId, workspaceId } = this.connection.inner;
    const { error } = await client.from('doc_snapshots').upsert(
      {
        doc_id: snapshot.docId,
        workspace_id: workspaceId,
        owner_id: ownerId,
        state: bytesToByteaHex(snapshot.bin),
        updated_at: snapshot.timestamp.toISOString(),
        client_id: this.clientId,
      },
      { onConflict: 'doc_id' }
    );

    if (error) {
      throw new Error(`SupabaseDocStorage.setDocSnapshot: ${error.message}`);
    }

    await client.rpc('compact_doc_updates', {
      p_doc_id: snapshot.docId,
      p_before: snapshot.timestamp.toISOString(),
    });

    return true;
  }

  protected override async getDocUpdates(docId: string): Promise<DocRecord[]> {
    const { client, workspaceId } = this.connection.inner;
    const { data, error } = await client
      .from('doc_updates')
      .select('id, doc_id, update, created_at, client_id')
      .eq('doc_id', docId)
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`SupabaseDocStorage.getDocUpdates: ${error.message}`);
    }

    return ((data ?? []) as DocUpdateRow[]).map(row => ({
      docId: row.doc_id,
      bin: byteaHexToBytes(row.update),
      timestamp: new Date(row.created_at),
    }));
  }

  protected override async markUpdatesMerged(
    _docId: string,
    updates: DocRecord[]
  ): Promise<number> {
    return updates.length;
  }

  private ensureRealtime() {
    if (this.realtimeStarted) {
      return;
    }
    this.realtimeStarted = true;
    const { client, workspaceId } = this.connection.inner;

    this.channel = client
      .channel(`blank-docs:${workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'doc_updates',
          filter: `workspace_id=eq.${workspaceId}`,
        },
        payload => {
          const row = payload.new as DocUpdateRow;
          if (row.client_id === this.clientId) {
            return;
          }
          this.emit('update', {
            docId: row.doc_id,
            bin: byteaHexToBytes(row.update),
            timestamp: new Date(row.created_at),
          });
        }
      )
      .on('broadcast', { event: 'doc_update' }, ({ payload }) => {
        const p = payload as {
          docId: string;
          update: string;
          timestamp: string;
          clientId?: string;
        };
        if (p.clientId === this.clientId) {
          return;
        }
        this.emit('update', {
          docId: p.docId,
          bin: base64ToBytes(p.update),
          timestamp: new Date(p.timestamp),
        });
      })
      .subscribe();
  }
}
