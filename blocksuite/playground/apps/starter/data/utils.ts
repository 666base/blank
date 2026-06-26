import type { Workspace } from '@blocksuite/blank/store';

export interface InitFn {
  (collection: Workspace, docId: string): Promise<void> | void;
  id: string;
  displayName: string;
  description: string;
}
