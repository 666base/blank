import type { StorageConstructor } from '..';
import { SupabaseAwarenessStorage } from './awareness';
import { SupabaseBlobStorage } from './blob';
import { SupabaseDocStorage } from './doc';

export * from './awareness';
export * from './blob';
export * from './connection';
export * from './doc';

export const supabaseStorages = [
  SupabaseDocStorage,
  SupabaseBlobStorage,
  SupabaseAwarenessStorage,
] satisfies StorageConstructor[];
