import { Service } from '@toeverything/infra';

import type { WorkspaceService } from '../../workspace';
import { WorkspaceShareSetting } from '../entities/share-setting';

export class WorkspaceShareSettingService extends Service {
  constructor(private readonly workspaceService: WorkspaceService) {
    super();
  }

  sharePreview =
    this.workspaceService.workspace.flavour !== 'local'
      ? this.framework.createEntity(WorkspaceShareSetting)
      : null;

  override dispose(): void {
    this.sharePreview?.dispose();
  }
}
