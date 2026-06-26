import { Switch } from '@blank/component';
import {
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useAsyncCallback } from '@blank/core/components/hooks/blank-async-hooks';
import { ServerService } from '@blank/core/modules/cloud';
import { WorkspacePermissionService } from '@blank/core/modules/permissions';
import { WorkspaceShareSettingService } from '@blank/core/modules/share-setting';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';

export const AiSetting = () => {
  const shareSetting = useService(WorkspaceShareSettingService).sharePreview;
  const serverService = useService(ServerService);
  const serverEnableAi = useLiveData(
    serverService.server.features$.map(f => f?.copilot)
  );

  if (!shareSetting || !serverEnableAi) {
    return null;
  }

  return <AiSettingInner shareSetting={shareSetting} />;
};

const AiSettingInner = ({
  shareSetting,
}: {
  shareSetting: NonNullable<
    ReturnType<WorkspaceShareSettingService['sharePreview']>
  >;
}) => {
  const t = useI18n();
  const workspaceEnableAi = useLiveData(shareSetting.enableAi$);
  const loading = useLiveData(shareSetting.isLoading$);
  const permissionService = useService(WorkspacePermissionService);
  const isOwner = useLiveData(permissionService.permission.isOwner$);

  const toggleAi = useAsyncCallback(
    async (checked: boolean) => {
      await shareSetting.setEnableAi(checked);
    },
    [shareSetting]
  );

  if (!isOwner) {
    return null;
  }

  return (
    <SettingWrapper
      title={t['com.blank.settings.workspace.blank-ai.title']()}
    >
      <SettingRow
        name={t['com.blank.settings.workspace.blank-ai.label']()}
        desc={t['com.blank.settings.workspace.blank-ai.description']()}
      >
        <Switch
          checked={!!workspaceEnableAi}
          onChange={toggleAi}
          disabled={loading}
        />
      </SettingRow>
    </SettingWrapper>
  );
};
