import { JOURNAL_DATE_FORMAT, JournalService } from '@blank/core/modules/journal';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { TodayIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { TabItem } from './tab-item';
import type { AppTabCustomFCProps } from './type';

export const AppTabJournal = ({ tab }: AppTabCustomFCProps) => {
  const workbench = useService(WorkbenchService).workbench;
  const journalService = useService(JournalService);

  const handleOpenToday = useCallback(() => {
    const today = dayjs().format(JOURNAL_DATE_FORMAT);
    const docs = journalService.journalsByDate$(today).value;
    if (docs.length > 0) {
      workbench.openDoc(
        { docId: docs[0].id, fromTab: 'true' },
        { at: 'active', replaceHistory: true }
      );
      return;
    }
    workbench.open('/journals', { at: 'active' });
  }, [journalService, workbench]);

  return (
    <TabItem onClick={handleOpenToday} id={tab.key} label="Journal">
      <TodayIcon />
    </TabItem>
  );
};
