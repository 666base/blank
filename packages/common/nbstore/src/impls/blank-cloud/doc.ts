import {
  type DocClock,
  type DocClocks,
  type DocRecord,
  DocStorageBase,
  type DocStorageOptions,
  type DocUpdate,
} from '../../storage';
import { isEmptyUpdate } from '../../utils/is-empty-update';
import type { SpaceType } from '../../utils/universal-id';
import {
  blankRestFetch,
  blankRpc,
  bytesToPostgresHex,
  type BlankSupabaseHttpOptions,
  decodeBytea,
} from './http';
import { BlankDocConnection } from './connection';

export interface BlankDocStorageOptions extends DocStorageOptions {
  supabaseUrl: string;
  supabaseAnonKey: string;
  accessToken: string;
  type: SpaceType;
}

type DocUpdateRow = {
  seq: number;
  update_data: string;
  created_at: string;
  editor_id: string | null;
};

export class BlankDocStorage extends DocStorageBase<BlankDocStorageOptions> {
  static readonly identifier = 'BlankDocStorage';

  readonly connection = new BlankDocConnection(
    () => this.httpOptions,
    () => this.spaceId,
    update => this.emit('update', update)
  );

  readonly spaceType = this.options.type;

  private get httpOptions(): BlankSupabaseHttpOptions {
    return {
      supabaseUrl: this.options.supabaseUrl,
      supabaseAnonKey: this.options.supabaseAnonKey,
      accessToken: this.options.accessToken,
    };
  }

  override async pushDocUpdate(update: DocUpdate) {
    if (isEmptyUpdate(update.bin)) {
      return { docId: update.docId, timestamp: new Date() };
    }

    const rows = await blankRpc<
      { out_seq: number; out_created_at: string }[]
    >(this.httpOptions, 'blank_push_doc_update', {
      p_workspace_id: this.spaceId,
      p_doc_id: update.docId,
      p_update_data: bytesToPostgresHex(update.bin),
    });

    const row = rows[0];
    const timestamp = new Date(row?.out_created_at ?? Date.now());

    this.emit('update', {
      docId: update.docId,
      bin: update.bin,
      timestamp,
      editor: update.editor,
    });

    return { docId: update.docId, timestamp };
  }

  override async getDocTimestamp(docId: string): Promise<DocClock | null> {
    const res = await blankRestFetch(
      this.httpOptions,
      `/blank_doc_updates?workspace_id=eq.${this.spaceId}&doc_id=eq.${encodeURIComponent(docId)}&select=created_at&order=created_at.desc&limit=1`
    );
    const rows = (await res.json()) as { created_at: string }[];
    if (!rows.length) {
      return null;
    }
    return { docId, timestamp: new Date(rows[0].created_at) };
  }

  override async getDocTimestamps(after?: Date): Promise<DocClocks> {
    const filter = after
      ? `&created_at=gt.${encodeURIComponent(after.toISOString())}`
      : '';
    const res = await blankRestFetch(
      this.httpOptions,
      `/blank_doc_updates?workspace_id=eq.${this.spaceId}&select=doc_id,created_at${filter}&order=created_at.asc`
    );
    const rows = (await res.json()) as {
      doc_id: string;
      created_at: string;
    }[];
    const clocks: DocClocks = {};
    for (const row of rows) {
      const ts = new Date(row.created_at);
      const prev = clocks[row.doc_id];
      if (!prev || ts > prev) {
        clocks[row.doc_id] = ts;
      }
    }
    return clocks;
  }

  override async deleteDoc(_docId: string) {
    // Tombstones deferred.
  }

  protected override async getDocSnapshot(
    docId: string
  ): Promise<DocRecord | null> {
    const updates = await this.fetchDocUpdates(docId);
    if (!updates.length) {
      return null;
    }
    return this.squash(updates);
  }

  protected override async setDocSnapshot() {
    return false;
  }

  protected override async getDocUpdates() {
    return [];
  }

  protected override async markUpdatesMerged() {
    return 0;
  }

  private async fetchDocUpdates(docId: string): Promise<DocRecord[]> {
    const res = await blankRestFetch(
      this.httpOptions,
      `/blank_doc_updates?workspace_id=eq.${this.spaceId}&doc_id=eq.${encodeURIComponent(docId)}&select=seq,update_data,created_at,editor_id&order=seq.asc`
    );
    const rows = (await res.json()) as DocUpdateRow[];
    return rows.map(row => ({
      docId,
      bin: decodeBytea(row.update_data),
      timestamp: new Date(row.created_at),
      editor: row.editor_id ?? undefined,
    }));
  }
}
