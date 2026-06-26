import { RadioGroup } from '@blank/component';
import { LiveData, useLiveData, useService, useServiceOptional } from '@toeverything/infra';
import { useCallback } from 'react';

import type { SidebarTab } from '../../entities/sidebar-tab';
import { ViewService } from '../../services/view';
import { WorkbenchService } from '../../services/workbench';
import {
  useViewIslandRegistered,
  ViewSidebarTabIconTarget,
} from '../view-islands';
import * as styles from './sidebar-header-switcher.css';
import { sidebarTabIdToIcon } from './sidebar-tab-icons';

const emptySidebarTabs$ = new LiveData<SidebarTab[]>([]);
const emptyActiveSidebarTab$ = new LiveData<SidebarTab | null>(null);

function SidebarTabIconLabel({
  viewId,
  tabId,
}: {
  viewId: string;
  tabId: string;
}) {
  const islandId = `${viewId}:sidebar:${tabId}:icon`;
  const hasIsland = useViewIslandRegistered(islandId);

  if (hasIsland) {
    return (
      <ViewSidebarTabIconTarget
        className={styles.iconContainer}
        viewId={viewId}
        tabId={tabId}
      />
    );
  }

  const Icon = sidebarTabIdToIcon[tabId];
  if (!Icon) {
    return null;
  }

  return <Icon className={styles.iconContainer} />;
}

// Shown in the desktop title bar (Windows) or in the right sidebar header (web).
export const SidebarHeaderSwitcher = () => {
  const scopedView = useServiceOptional(ViewService)?.view;
  const workbench = useService(WorkbenchService).workbench;
  const activeView = useLiveData(workbench.activeView$);
  const view = scopedView ?? activeView;
  const sidebarOpen = useLiveData(workbench.sidebarOpen$);
  const tabs = useLiveData(view?.sidebarTabs$ ?? emptySidebarTabs$);
  const activeTab = useLiveData(
    view?.activeSidebarTab$ ?? emptyActiveSidebarTab$
  );

  const tabItems =
    tabs?.map(tab => ({
      value: tab.id,
      label: <SidebarTabIconLabel viewId={view!.id} tabId={tab.id} />,
      testId: `sidebar-tab-${tab.id}`,
      style: { padding: 0, fontSize: 20, width: 24 },
    })) ?? [];

  const handleActiveTabChange = useCallback(
    (tabId: string) => {
      if (!view) {
        return;
      }
      view.activeSidebarTab(tabId);
      if (!sidebarOpen) {
        workbench.openSidebar();
      }
    },
    [sidebarOpen, view, workbench]
  );

  if (!view || !tabItems.length) {
    return null;
  }

  return (
    <RadioGroup
      className={styles.switcher}
      iconMode
      borderRadius={8}
      itemHeight={24}
      padding={4}
      gap={8}
      items={tabItems}
      value={activeTab?.id}
      onChange={handleActiveTabChange}
    />
  );
};
