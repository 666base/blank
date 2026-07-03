import { JOURNAL_DATE_FORMAT, JournalService } from '@blank/core/modules/journal';
import { GlobalCacheService } from '@blank/core/modules/storage';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';

import { cacheKey } from './constants';
import { TabItem } from './tab-item';
import type { AppTabCustomFCProps } from './type';

export const AppTabJournal = ({ tab }: AppTabCustomFCProps) => {
  const workbench = useService(WorkbenchService).workbench;
  const journalService = useService(JournalService);
  const globalCache = useService(GlobalCacheService).globalCache;

  useEffect(() => {
    import('../../pages/workspace/journals').catch(console.error);
    import('../../pages/workspace/detail/mobile-detail-page').catch(console.error);
  }, []);

  const handleOpenToday = useCallback(() => {
    globalCache.set(cacheKey, 'journal');
    const today = dayjs().format(JOURNAL_DATE_FORMAT);
    const docs = journalService.journalsByDate$(today).value;
    if (docs.length > 0) {
      workbench.openDoc(
        { docId: docs[0].id, fromTab: 'true' },
        { at: 'active', replaceHistory: true }
      );
      return;
    }
    workbench.open('/journals', { at: 'active', replaceHistory: true });
  }, [globalCache, journalService, workbench]);

  return (
    <TabItem onClick={handleOpenToday} id={tab.key} label="Journal" icon="journal" />
  );
};
