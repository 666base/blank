import { Switch } from '@blank/component';
import {
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useAsyncCallback } from '@blank/core/components/hooks/blank-async-hooks';
import { WorkspacePermissionService } from '@blank/core/modules/permissions';
import { WorkspaceShareSettingService } from '@blank/core/modules/share-setting';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';

export const SharingPanel = () => {
  const workspace = useService(WorkspaceService).workspace;
  if (workspace.flavour === 'local') {
    return null;
  }
  return <Sharing />;
};

export const Sharing = () => {
  const shareSetting = useService(WorkspaceShareSettingService).sharePreview;
  if (!shareSetting) {
    return null;
  }
  return <SharingInner shareSetting={shareSetting} />;
};

const SharingInner = ({
  shareSetting,
}: {
  shareSetting: NonNullable<
    ReturnType<WorkspaceShareSettingService['sharePreview']>
  >;
}) => {
  const t = useI18n();
  const enableSharing = useLiveData(shareSetting.enableSharing$);
  const enableUrlPreview = useLiveData(shareSetting.enableUrlPreview$);
  const loading = useLiveData(shareSetting.isLoading$);
  const permissionService = useService(WorkspacePermissionService);
  const isOwner = useLiveData(permissionService.permission.isOwner$);

  const handleToggleSharing = useAsyncCallback(
    async (checked: boolean) => {
      await shareSetting.setEnableSharing(checked);
    },
    [shareSetting]
  );

  const handleCheck = useAsyncCallback(
    async (checked: boolean) => {
      await shareSetting.setEnableUrlPreview(checked);
    },
    [shareSetting]
  );

  if (!isOwner) {
    return null;
  }

  return (
    <SettingWrapper title={t['com.blank.settings.workspace.sharing.title']()}>
      <SettingRow
        name={t['com.blank.settings.workspace.sharing.url-preview.title']()}
        desc={t[
          'com.blank.settings.workspace.sharing.url-preview.description'
        ]()}
      >
        <Switch
          checked={enableUrlPreview || false}
          onChange={handleCheck}
          disabled={loading}
        />
      </SettingRow>
      <SettingRow
        name={t[
          'com.blank.settings.workspace.sharing.workspace-sharing.title'
        ]()}
        desc={t[
          'com.blank.settings.workspace.sharing.workspace-sharing.description'
        ]()}
      >
        <Switch
          checked={enableSharing ?? true}
          onChange={handleToggleSharing}
          disabled={loading}
        />
      </SettingRow>
    </SettingWrapper>
  );
};
