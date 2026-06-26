import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import type { SettingTab } from '@blank/core/modules/dialogs/constant';
import { useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Component = () => {
  const workspaceDialogService = useService(WorkspaceDialogService);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? undefined;
  const scrollAnchor = searchParams.get('scrollAnchor') ?? undefined;

  useEffect(() => {
    const dialogId = workspaceDialogService.open('setting', {
      activeTab: tab as SettingTab,
      scrollAnchor,
    });

    return () => {
      workspaceDialogService.close(dialogId);
    };
  }, [scrollAnchor, tab, workspaceDialogService]);

  return null;
};
