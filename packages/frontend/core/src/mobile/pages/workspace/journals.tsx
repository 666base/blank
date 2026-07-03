// @ts-nocheck
import {
  getDateFromUrl,
  JournalPlaceholder,
} from '@blank/core/desktop/pages/workspace/journals';
import { JournalService } from '@blank/core/modules/journal';
import { ViewService, WorkbenchService } from '@blank/core/modules/workbench';
import { scheduleRemoveBootSplash } from '@blank/core/utils/blank-fast-boot';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useLayoutEffect } from 'react';

import { AppTabs } from '../../components';
import { JournalPageHeader } from './detail/journal-date-picker';
import * as styles from './journals.css';

export const JournalsPageWithConfirmation = () => {
  const journalService = useService(JournalService);
  const workbench = useService(WorkbenchService).workbench;
  const view = useService(ViewService).view;
  const location = useLiveData(view.location$);
  const dateString = getDateFromUrl(location);
  const allJournalDates = useLiveData(journalService.allJournalDates$);
  const journals = useLiveData(journalService.journalsByDate$(dateString));
  const existingJournalId = journals?.[0]?.id;
  const openJournalDoc = useCallback(
    (docId: string) => {
      workbench.openDoc(docId, { replaceHistory: true, at: 'active' });
    },
    [workbench]
  );

  const handleDateChange = useCallback(
    (date: string) => {
      const journal = journalService.journalsByDate$(date).value?.[0];
      if (journal) {
        openJournalDoc(journal.id);
        return;
      }
      workbench.open(`/journals?date=${date}`, { at: 'active' });
    },
    [journalService, openJournalDoc, workbench]
  );

  useLayoutEffect(() => {
    if (!location.pathname.startsWith('/journals')) return;
    if (!existingJournalId) {
      scheduleRemoveBootSplash();
      return;
    }
    openJournalDoc(existingJournalId);
  }, [dateString, existingJournalId, location.pathname, openJournalDoc]);

  if (existingJournalId) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <JournalPageHeader
          className={styles.header}
          contentClassName={styles.headerTitle}
          date={dateString}
          onChange={handleDateChange}
          withDotDates={allJournalDates}
          pickerClassName={styles.journalDatePicker}
        />
        <JournalPlaceholder dateString={dateString} />
      </div>
      <AppTabs background={cssVarV2('layer/background/mobile/primary')} />
    </>
  );
};

export const Component = () => {
  return <JournalsPageWithConfirmation />;
};

