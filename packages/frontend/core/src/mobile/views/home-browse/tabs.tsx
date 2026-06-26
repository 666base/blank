import {
  WorkbenchLink,
  WorkbenchService,
} from '@blank/core/modules/workbench';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';

import * as styles from './styles.css';

export type HomeBrowseTab = 'docs' | 'collections' | 'tags';

const tabRoutes: { id: HomeBrowseTab; to: string }[] = [
  { id: 'docs', to: '/home' },
  { id: 'collections', to: '/home/collections' },
  { id: 'tags', to: '/home/tags' },
];

export function resolveHomeBrowseTab(pathname: string): HomeBrowseTab {
  if (pathname === '/home/collections' || pathname === '/collection') {
    return 'collections';
  }
  if (pathname === '/home/tags' || pathname === '/tag') {
    return 'tags';
  }
  return 'docs';
}

export function isHomeBrowseTabActive(pathname: string, to: string) {
  if (to === '/home') {
    return (
      pathname === '/home' ||
      pathname === '/all' ||
      (pathname.startsWith('/home') &&
        pathname !== '/home/collections' &&
        pathname !== '/home/tags')
    );
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

export const HomeBrowseTabs = () => {
  const t = useI18n();
  const workbench = useService(WorkbenchService).workbench;
  const location = useLiveData(workbench.location$);

  const labels: Record<HomeBrowseTab, string> = {
    docs: t['com.blank.workspaceSubPath.all'](),
    collections: t['com.blank.rootAppSidebar.collections'](),
    tags: t['com.blank.rootAppSidebar.tags'](),
  };

  return (
    <div className={styles.tabsRow}>
      {tabRoutes.map(tab => (
        <WorkbenchLink
          data-active={isHomeBrowseTabActive(location.pathname, tab.to)}
          replaceHistory
          className={styles.tab}
          key={tab.id}
          to={tab.to}
        >
          {labels[tab.id]}
        </WorkbenchLink>
      ))}
    </div>
  );
};
