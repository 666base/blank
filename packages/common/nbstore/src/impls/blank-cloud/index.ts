import type { StorageConstructor } from '..';
import { BlankDocStorage } from './doc';

export * from './doc';
export * from './http';

export const blankCloudStorages = [
  BlankDocStorage,
] satisfies StorageConstructor[];
