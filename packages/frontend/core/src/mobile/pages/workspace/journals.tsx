import {
  getDateFromUrl,
  JournalPlaceholder,
} from '@blank/core/desktop/pages/workspace/journals';
import { JournalService } from '@blank/core/modules/journal';
import { ViewService, WorkbenchService } from '@blank/core/modules/workbench';
import { i18nTime } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import dayjs from 'dayjs';
import { useCallback, useLayoutEffect } from 'react';

import { AppTabs, PageHeader } from '../../components';
import { JournalDatePicker } from './detail/journal-date-picker';
import * as styles from './journals.css';

export const JournalsPageWithConfirmation = () => {
  const journalService = useService(JournalService);
  const workbench = useService(WorkbenchService).workbench;
  const view = useService(ViewService).view;
  const location = useLiveData(view.location$);
  const dateString = getDateFromUrl(location);
  const allJournalDates = useLiveData(journalService.allJournalDates$);
  const existingJournalId = journalService.journalsByDate$(dateString).value[0]?.id;

  const openJournalDoc = useCallback(
    (docId: string) => {
      workbench.openDoc(docId, { replaceHistory: true, at: 'active' });
    },
    [workbench]
  );

  const handleDateChange = useCallback(
    (date: string) => {
      const journal = journalService.journalsByDate$(date).value[0];
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
    if (!existingJournalId) return;
    openJournalDoc(existingJournalId);
  }, [dateString, existingJournalId, location.pathname, openJournalDoc]);

  if (existingJournalId) {
    return (
      <AppTabs background={cssVarV2('layer/background/primary')} hidden />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <PageHeader
          className={styles.header}
          bottom={
            <JournalDatePicker
              date={dateString}
              onChange={handleDateChange}
              withDotDates={allJournalDates}
              className={styles.journalDatePicker}
            />
          }
          contentClassName={styles.headerTitle}
          bottomSpacer={94}
        >
          {i18nTime(dayjs(dateString), { absolute: { accuracy: 'month' } })}
        </PageHeader>
        <JournalPlaceholder dateString={dateString} />
      </div>
      <AppTabs background={cssVarV2('layer/background/primary')} />
    </>
  );
};

export const Component = () => {
  return <JournalsPageWithConfirmation />;
};
