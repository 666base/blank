import { MenuLinkItem } from '@blank/core/modules/app-sidebar/views';
import { DocDisplayMetaService } from '@blank/core/modules/doc-display-meta';
import { JournalService } from '@blank/core/modules/journal';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { useI18n } from '@blank/i18n';
import { TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';

export const AppSidebarJournalButton = () => {
  const t = useI18n();
  const docDisplayMetaService = useService(DocDisplayMetaService);
  const journalService = useService(JournalService);
  const workbench = useService(WorkbenchService).workbench;
  const location = useLiveData(workbench.location$);
  const maybeDocId = location.pathname.split('/')[1];
  const isJournal = !!useLiveData(journalService.journalDate$(maybeDocId));

  const JournalIcon = useLiveData(docDisplayMetaService.icon$(maybeDocId));
  const Icon = isJournal ? JournalIcon : TodayIcon;

  return (
    <MenuLinkItem
      data-testid="slider-bar-journals-button"
      active={isJournal || location.pathname.startsWith('/journals')}
      to={'/journals'}
      icon={<Icon />}
    >
      {t['com.blank.journal.app-sidebar-title']()}
    </MenuLinkItem>
  );
};
