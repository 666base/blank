import {
  fetchBlankWorkspaces,
  getBlankAccessToken,
  getBlankSupabaseAnonKey,
  getBlankSupabaseUrl,
  hasBlankWorkspaceDocUpdates,
  isBlankSupabaseConfigured,
} from '@blank/core/utils/blank-supabase';
import { DebugLogger } from '@blank/debug';
import type {
  BlobStorage,
  DocStorage,
  ListedBlobRecord,
} from '@blank/nbstore';
import {
  IndexedDBBlobStorage,
  IndexedDBBlobSyncStorage,
  IndexedDBDocStorage,
  IndexedDBDocSyncStorage,
  IndexedDBIndexerStorage,
  IndexedDBIndexerSyncStorage,
} from '@blank/nbstore/idb';
import {
  IndexedDBV1BlobStorage,
  IndexedDBV1DocStorage,
} from '@blank/nbstore/idb/v1';
import {
  SqliteBlobStorage,
  SqliteBlobSyncStorage,
  SqliteDocStorage,
  SqliteDocSyncStorage,
  SqliteIndexerStorage,
  SqliteIndexerSyncStorage,
} from '@blank/nbstore/sqlite';
import {
  SqliteV1BlobStorage,
  SqliteV1DocStorage,
} from '@blank/nbstore/sqlite/v1';
import type { WorkerInitOptions } from '@blank/nbstore/worker/client';
import { LiveData, Service } from '@toeverything/infra';
import { BehaviorSubject, from, switchMap } from 'rxjs';

import type {
  WorkspaceFlavourProvider,
  WorkspaceFlavoursProvider,
  WorkspaceMetadata,
  WorkspaceProfileInfo,
} from '../../workspace';
import type { Workspace } from '../../workspace/entities/workspace';
import { getWorkspaceProfileWorker } from './out-worker';

const logger = new DebugLogger('blank:cloud-workspace');
export const BLANK_CLOUD_FLAVOUR = 'blank-cloud';

class BlankCloudWorkspaceFlavourProvider implements WorkspaceFlavourProvider {
  readonly flavour = BLANK_CLOUD_FLAVOUR;

  private readonly refresh$ = new BehaviorSubject(0);
  readonly isRevalidating$ = new LiveData(false);

  constructor() {
    registerBlankCloudRevalidate(() => this.revalidate());
  }

  readonly workspaces$ = LiveData.from<WorkspaceMetadata[]>(
    this.refresh$.pipe(
      switchMap(() =>
        from(
          (async () => {
            if (!isBlankSupabaseConfigured() || !getBlankAccessToken()) {
              return [];
            }
            try {
              const rows = await fetchBlankWorkspaces();
              return rows.map(row => ({
                id: row.id,
                flavour: BLANK_CLOUD_FLAVOUR,
              }));
            } catch (e) {
              logger.error('Failed to list blank cloud workspaces', e);
              return [];
            }
          })()
        )
      )
    ),
    []
  );

  DocStorageType =
    BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
      ? SqliteDocStorage
      : IndexedDBDocStorage;
  DocStorageV1Type = BUILD_CONFIG.isElectron
    ? SqliteV1DocStorage
    : BUILD_CONFIG.isWeb || BUILD_CONFIG.isMobileWeb
      ? IndexedDBV1DocStorage
      : undefined;
  BlobStorageType =
    BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
      ? SqliteBlobStorage
      : IndexedDBBlobStorage;
  BlobStorageV1Type = BUILD_CONFIG.isElectron
    ? SqliteV1BlobStorage
    : BUILD_CONFIG.isWeb || BUILD_CONFIG.isMobileWeb
      ? IndexedDBV1BlobStorage
      : undefined;
  DocSyncStorageType =
    BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
      ? SqliteDocSyncStorage
      : IndexedDBDocSyncStorage;
  BlobSyncStorageType =
    BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
      ? SqliteBlobSyncStorage
      : IndexedDBBlobSyncStorage;
  IndexerStorageType =
    BUILD_CONFIG.isElectron || BUILD_CONFIG.isIOS || BUILD_CONFIG.isAndroid
      ? SqliteIndexerStorage
      : IndexedDBIndexerStorage;
  IndexerSyncStorageType = BUILD_CONFIG.isElectron
    ? SqliteIndexerSyncStorage
    : IndexedDBIndexerSyncStorage;

  revalidate = () => {
    this.refresh$.next(this.refresh$.value + 1);
  };

  async deleteWorkspace(id: string): Promise<void> {
    logger.warn(`deleteWorkspace(${id}) — remote delete not implemented`);
    this.revalidate();
  }

  async createWorkspace(
    _initial: (
      docCollection: unknown,
      blobStorage: BlobStorage,
      docStorage: DocStorage
    ) => Promise<void>
  ): Promise<WorkspaceMetadata> {
    throw new Error(
      'Create a workspace in Supabase (signup creates "My Notes"). Sign in and refresh.'
    );
  }

  async getWorkspaceProfile(
    id: string
  ): Promise<WorkspaceProfileInfo | undefined> {
    const rows = await fetchBlankWorkspaces();
    const row = rows.find(r => r.id === id);

    const docStorage = new this.DocStorageType({
      id,
      flavour: this.flavour,
      type: 'workspace',
      readonlyMode: true,
    });
    docStorage.connection.connect();
    await docStorage.connection.waitForConnected();
    const localData = await docStorage.getDoc(id);
    docStorage.connection.disconnect();

    if (!localData) {
      return {
        name: row?.name ?? 'Blank Sync',
        avatar: undefined,
        isOwner: true,
      };
    }

    const client = getWorkspaceProfileWorker();
    const result = await client.call('renderWorkspaceProfile', [
      localData.bin,
    ] as Uint8Array[]);

    return {
      name: result.name || row?.name || 'Blank Sync',
      avatar: result.avatar,
      isOwner: true,
    };
  }

  async getWorkspaceBlob(_id: string, _blob: string): Promise<Blob | null> {
    return null;
  }

  async listBlobs(_id: string): Promise<ListedBlobRecord[]> {
    return [];
  }

  async deleteBlob(
    _id: string,
    _blob: string,
    _permanent: boolean
  ): Promise<void> {
    return;
  }

  getEngineWorkerInitOptions(workspaceId: string): WorkerInitOptions {
    const supabaseUrl = getBlankSupabaseUrl();
    const supabaseAnonKey = getBlankSupabaseAnonKey();
    const accessToken = getBlankAccessToken();

    if (!supabaseUrl || !supabaseAnonKey || !accessToken) {
      throw new Error('Blank sync requires Supabase login');
    }

    const localOpts = {
      flavour: this.flavour,
      type: 'workspace' as const,
      id: workspaceId,
    };

    return {
      local: {
        doc: {
          name: this.DocStorageType.identifier,
          opts: localOpts,
        },
        blob: {
          name: this.BlobStorageType.identifier,
          opts: localOpts,
        },
        blobSync: {
          name: this.BlobSyncStorageType.identifier,
          opts: localOpts,
        },
        docSync: {
          name: this.DocSyncStorageType.identifier,
          opts: localOpts,
        },
        awareness: {
          name: 'BroadcastChannelAwarenessStorage',
          opts: { id: `${this.flavour}:${workspaceId}` },
        },
        indexer: {
          name: this.IndexerStorageType.identifier,
          opts: localOpts,
        },
        indexerSync: {
          name: this.IndexerSyncStorageType.identifier,
          opts: localOpts,
        },
      },
      remotes: {
        [`blank:${this.flavour}`]: {
          doc: {
            name: 'BlankDocStorage',
            opts: {
              ...localOpts,
              supabaseUrl,
              supabaseAnonKey,
              accessToken,
            },
          },
        },
        v1: {
          doc: this.DocStorageV1Type
            ? {
                name: this.DocStorageV1Type.identifier,
                opts: { id: workspaceId, type: 'workspace' },
              }
            : undefined,
          blob: this.BlobStorageV1Type
            ? {
                name: this.BlobStorageV1Type.identifier,
                opts: { id: workspaceId, type: 'workspace' },
              }
            : undefined,
        },
      },
    };
  }

  onWorkspaceInitialized(workspace: Workspace): void {
    this.bootstrapWorkspace(workspace).catch(console.error);
  }

  private async bootstrapWorkspace(workspace: Workspace) {
    try {
      await workspace.engine.doc.waitForDocReady(workspace.id);
      const collection = workspace.docCollection;
      if (collection.meta.docMetas.length > 0) {
        return;
      }

      if (await hasBlankWorkspaceDocUpdates(workspace.id)) {
        logger.info(
          `Skip seeding ${workspace.id} — remote doc updates already exist`
        );
        return;
      }

      const rows = await fetchBlankWorkspaces();
      const row = rows.find(r => r.id === workspace.id);
      const workspaceName = row?.name ?? 'My Notes';

      collection.meta.initialize();
      workspace.setName(workspaceName);
      workspace.docs.createDoc({ title: 'Welcome' });
      logger.info(`Seeded blank-cloud workspace ${workspace.id}`);
    } catch (error) {
      logger.error('Failed to seed blank-cloud workspace', error);
    }
  }
}

let revalidateBlankCloudList: (() => void) | null = null;

export function registerBlankCloudRevalidate(fn: () => void) {
  revalidateBlankCloudList = fn;
}

export function triggerBlankCloudRevalidate() {
  revalidateBlankCloudList?.();
}

export class BlankCloudWorkspaceFlavoursProvider
  extends Service
  implements WorkspaceFlavoursProvider
{
  workspaceFlavours$ = new LiveData<WorkspaceFlavourProvider[]>([
    new BlankCloudWorkspaceFlavourProvider(),
  ]);
}

/** Call after Blank login so workspace list includes Supabase workspaces. */
export function revalidateBlankCloudWorkspaces() {
  triggerBlankCloudRevalidate();
}
