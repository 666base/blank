import type { AwarenessRecord } from '../../storage';
import { AwarenessStorageBase } from '../../storage';
import {
  base64ToBytes,
  BlankSupabaseConnection,
  type BlankSupabaseConnectionOptions,
  bytesToBase64,
} from './connection';

export type SupabaseAwarenessStorageOptions = BlankSupabaseConnectionOptions & {
  clientId?: string;
};

/**
 * Ephemeral awareness via Supabase Realtime Broadcast (not persisted).
 */
export class SupabaseAwarenessStorage extends AwarenessStorageBase {
  static readonly identifier = 'SupabaseAwarenessStorage';

  readonly connection = new BlankSupabaseConnection(this.options);

  private channels = new Map<
    string,
    ReturnType<BlankSupabaseConnection['inner']['client']['channel']>
  >();

  constructor(private readonly options: SupabaseAwarenessStorageOptions) {
    super();
  }

  private get clientId() {
    return this.options.clientId ?? 'blank-client';
  }

  override async update(
    record: AwarenessRecord,
    origin?: string
  ): Promise<void> {
    const { client, workspaceId } = this.connection.inner;
    const channelName = `awareness:${workspaceId}:${record.docId}`;
    let channel = this.channels.get(channelName);
    if (!channel) {
      channel = client.channel(channelName);
      this.channels.set(channelName, channel);
      await new Promise<void>((resolve, reject) => {
        channel!.subscribe(status => {
          if (status === 'SUBSCRIBED') resolve();
          if (status === 'CHANNEL_ERROR') reject(new Error(status));
        });
      });
    }

    await channel.send({
      type: 'broadcast',
      event: 'awareness',
      payload: {
        docId: record.docId,
        bin: bytesToBase64(record.bin),
        clientId: this.clientId,
        origin,
      },
    });
  }

  override subscribeUpdate(
    id: string,
    onUpdate: (update: AwarenessRecord, origin?: string) => void,
    _onCollect: () => Promise<AwarenessRecord | null>
  ): () => void {
    const { client, workspaceId } = this.connection.inner;
    const channelName = `awareness:${workspaceId}:${id}`;
    const channel = client
      .channel(channelName)
      .on('broadcast', { event: 'awareness' }, ({ payload }) => {
        const p = payload as {
          docId: string;
          bin: string;
          clientId?: string;
          origin?: string;
        };
        if (p.clientId === this.clientId) {
          return;
        }
        onUpdate({ docId: p.docId, bin: base64ToBytes(p.bin) }, p.origin);
      });

    this.channels.set(channelName, channel);
    channel.subscribe();

    return () => {
      void client.removeChannel(channel);
      this.channels.delete(channelName);
    };
  }
}
