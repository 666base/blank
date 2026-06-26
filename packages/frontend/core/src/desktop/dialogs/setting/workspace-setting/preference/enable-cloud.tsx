import { SettingRow } from '@blank/component/setting-components';
import { Button } from '@blank/component/ui/button';
import { useEnableCloud } from '@blank/core/components/hooks/blank/use-enable-cloud';
import {
  type Workspace,
  WorkspaceService,
} from '@blank/core/modules/workspace';
import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { UNTITLED_WORKSPACE_NAME } from '@blank/env/constant';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';

export interface PublishPanelProps {
  workspace: Workspace | null;
}

export const EnableCloudPanel = ({
  onCloseSetting,
}: {
  onCloseSetting?: () => void;
}) => {
  const t = useI18n();
  const confirmEnableCloud = useEnableCloud();

  const workspace = useService(WorkspaceService).workspace;
  const name = useLiveData(workspace.name$);
  const flavour = workspace.flavour;

  const confirmEnableCloudAndClose = useCallback(() => {
    if (!workspace) return;
    confirmEnableCloud(workspace, {
      onSuccess: () => {
        onCloseSetting?.();
      },
    });
  }, [confirmEnableCloud, onCloseSetting, workspace]);

  if (isLocalOnlyMode() || flavour !== 'local') {
    return null;
  }

  return (
    <SettingRow
      name={t['Workspace saved locally']({
        name: name ?? UNTITLED_WORKSPACE_NAME,
      })}
      desc={t['Enable cloud hint']()}
      spreadCol={false}
      style={{
        padding: '10px',
        background: 'var(--blank-background-secondary-color)',
        marginTop: '24px',
      }}
    >
      <Button
        data-testid="publish-enable-blank-cloud-button"
        variant="primary"
        onClick={confirmEnableCloudAndClose}
        style={{ marginTop: '12px' }}
      >
        {t['Enable Blank Cloud']()}
      </Button>
    </SettingRow>
  );
};
