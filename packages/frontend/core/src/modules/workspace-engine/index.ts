import { type Framework } from '@toeverything/infra';

import { ServersService } from '../cloud/services/servers';
import { GlobalState } from '../storage';
import { WorkspaceFlavoursProvider } from '../workspace';
import { CloudWorkspaceFlavoursProvider } from './impls/cloud';
import { BlankCloudWorkspaceFlavoursProvider } from './impls/blank-cloud';
import {
  LocalWorkspaceFlavoursProvider,
  setLocalWorkspaceIds,
} from './impls/local';
import { isBlankBuild } from '../../utils/blank-links';

export { base64ToUint8Array, uint8ArrayToBase64 } from './utils/base64';
export {
  BLANK_CLOUD_FLAVOUR,
  revalidateBlankCloudWorkspaces,
} from './impls/blank-cloud';

export function configureBrowserWorkspaceFlavours(framework: Framework) {
  framework
    .impl(WorkspaceFlavoursProvider('LOCAL'), LocalWorkspaceFlavoursProvider)
    .impl(WorkspaceFlavoursProvider('CLOUD'), CloudWorkspaceFlavoursProvider, [
      GlobalState,
      ServersService,
    ]);

  if (isBlankBuild()) {
    framework.impl(
      WorkspaceFlavoursProvider('BLANK_CLOUD'),
      BlankCloudWorkspaceFlavoursProvider
    );
  }
}

/**
 * a hack for directly add local workspace to workspace list
 * Used after copying sqlite database file to appdata folder
 */
export function _addLocalWorkspace(id: string) {
  setLocalWorkspaceIds(ids => (ids.includes(id) ? ids : [...ids, id]));
}
