import {
  type BlobRecord,
  BlobStorageBase,
  type ListedBlobRecord,
} from '../../storage';
import {
  BlankSupabaseConnection,
  type BlankSupabaseStorageOpts,
} from './connection';

export type SupabaseBlobStorageOptions = BlankSupabaseStorageOpts;

/**
 * Blob storage on Supabase Storage bucket `blobs`.
 * Object path: `{ownerId}/{workspaceId}/{key}`
 */
export class SupabaseBlobStorage extends BlobStorageBase {
  static readonly identifier = 'SupabaseBlobStorage';
  override readonly isReadonly = false;

  readonly connection = new BlankSupabaseConnection(this.options);

  constructor(private readonly options: SupabaseBlobStorageOptions) {
    super();
  }

  private pathFor(key: string, ownerId: string, workspaceId: string) {
    return `${ownerId}/${workspaceId}/${key}`;
  }

  override async get(
    key: string,
    signal?: AbortSignal
  ): Promise<BlobRecord | null> {
    const { client, ownerId, workspaceId } = this.connection.inner;
    const path = this.pathFor(key, ownerId, workspaceId);
    const { data, error } = await client.storage
      .from('blobs')
      .download(path, { abortSignal: signal as AbortSignal | undefined });

    if (error || !data) {
      return null;
    }

    const buf = new Uint8Array(await data.arrayBuffer());
    return {
      key,
      data: buf,
      mime: data.type || 'application/octet-stream',
    };
  }

  override async set(blob: BlobRecord, signal?: AbortSignal): Promise<void> {
    const { client, ownerId, workspaceId } = this.connection.inner;
    const path = this.pathFor(blob.key, ownerId, workspaceId);
    const { error } = await client.storage
      .from('blobs')
      .upload(path, blob.data, {
        contentType: blob.mime,
        upsert: true,
        abortSignal: signal as AbortSignal | undefined,
      });
    if (error) {
      throw new Error(`SupabaseBlobStorage.set: ${error.message}`);
    }
  }

  override async delete(
    key: string,
    _permanently: boolean,
    _signal?: AbortSignal
  ): Promise<void> {
    const { client, ownerId, workspaceId } = this.connection.inner;
    const path = this.pathFor(key, ownerId, workspaceId);
    await client.storage.from('blobs').remove([path]);
  }

  override async release(_signal?: AbortSignal): Promise<void> {
    // Soft-delete not used; no-op.
  }

  override async list(_signal?: AbortSignal): Promise<ListedBlobRecord[]> {
    const { client, ownerId, workspaceId } = this.connection.inner;
    const prefix = `${ownerId}/${workspaceId}`;
    const { data, error } = await client.storage.from('blobs').list(prefix, {
      limit: 1000,
    });
    if (error) {
      throw new Error(`SupabaseBlobStorage.list: ${error.message}`);
    }
    return (data ?? [])
      .filter(f => f.name && !f.name.endsWith('/'))
      .map(f => ({
        key: f.name,
        mime: f.metadata?.mimetype ?? 'application/octet-stream',
        size: f.metadata?.size ?? f.metadata?.contentLength ?? 0,
        createdAt: f.created_at ? new Date(f.created_at) : undefined,
      }));
  }
}
