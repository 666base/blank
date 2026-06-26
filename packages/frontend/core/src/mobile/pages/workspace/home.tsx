import { SafeArea } from '@blank/component';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { scheduleRemoveBootSplash } from '@blank/core/utils/blank-fast-boot';
import { useLiveData, useService } from '@toeverything/infra';
import { useLayoutEffect } from 'react';

import { AppTabs } from '../../components';
import { CollectionList } from '../../views/all-docs/collection/list';
import { TagList } from '../../views/all-docs/tag/list';
import {
  HomeBrowseDocs,
  HomeBrowseTabs,
  resolveHomeBrowseTab,
} from '../../views/home-browse';
import * as browseStyles from '../../views/home-browse/styles.css';
import { HomeHeader, RecentDocs } from '../../views';

export const Component = () => {
  const workbench = useService(WorkbenchService).workbench;
  const pathname = useLiveData(workbench.location$).pathname;
  const activeTab = resolveHomeBrowseTab(pathname);

  useLayoutEffect(() => {
    scheduleRemoveBootSplash();
  }, []);

  return (
    <>
      <HomeHeader />
      <SafeArea bottom>
        <HomeBrowseTabs />
        {activeTab === 'docs' ? <RecentDocs /> : null}
        <div className={browseStyles.tabContent}>
          {activeTab === 'docs' ? <HomeBrowseDocs /> : null}
          {activeTab === 'collections' ? <CollectionList /> : null}
          {activeTab === 'tags' ? <TagList /> : null}
        </div>
      </SafeArea>
      <AppTabs />
    </>
  );
};
