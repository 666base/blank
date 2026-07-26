import { type Framework, LiveData, Service } from '@toeverything/infra';

import { WorkspaceFlavoursProvider } from '../workspace';
import type { WorkspaceFlavoursProvider as IWorkspaceFlavoursProvider } from '../workspace/providers/flavour';
import {
  LocalWorkspaceFlavoursProvider,
  setLocalWorkspaceIds,
} from './impls/local';

export { base64ToUint8Array, uint8ArrayToBase64 } from './utils/base64';

/** Blank: no AFFiNE Cloud flavour providers. */
class EmptyCloudWorkspaceFlavoursProvider
  extends Service
  implements IWorkspaceFlavoursProvider
{
  workspaceFlavours$ = new LiveData([]);
}

export function configureBrowserWorkspaceFlavours(framework: Framework) {
  framework
    .impl(WorkspaceFlavoursProvider('LOCAL'), LocalWorkspaceFlavoursProvider)
    .impl(
      WorkspaceFlavoursProvider('CLOUD'),
      EmptyCloudWorkspaceFlavoursProvider
    );
}

/**
 * a hack for directly add local workspace to workspace list
 * Used after copying sqlite database file to appdata folder
 */
export function _addLocalWorkspace(id: string) {
  setLocalWorkspaceIds(ids => (ids.includes(id) ? ids : [...ids, id]));
}
