import {
  IconButton,
  SafeArea,
  startScopedViewTransition,
} from '@blank/component';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { useI18n } from '@blank/i18n';
import { SearchIcon, SettingsIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

import { NotificationButton } from '../../../components/root-app-sidebar/notification-button';
import { WorkspaceSelector } from '../../components';
import { searchVTScope } from '../../components/search-input/style.css';
import { useGlobalEvent } from '../../hooks/use-global-events';
import * as styles from './styles.css';

/**
 * Contains workspace selector plus floating actions (search, notifications, settings).
 */
export const HomeHeader = () => {
  const workspaceDialogService = useService(WorkspaceDialogService);

  const workspaceCardRef = useRef<HTMLDivElement>(null);
  const floatWorkspaceCardRef = useRef<HTMLDivElement>(null);
  const t = useI18n();
  const workbench = useService(WorkbenchService).workbench;

  const navSearch = useCallback(() => {
    startScopedViewTransition(searchVTScope, () => {
      workbench.open('/search');
    });
  }, [workbench]);

  const [dense, setDense] = useState(false);

  useGlobalEvent(
    'scroll',
    useCallback(() => {
      if (!workspaceCardRef.current || !floatWorkspaceCardRef.current) return;
      const inFlowTop = workspaceCardRef.current.getBoundingClientRect().top;
      const floatTop =
        floatWorkspaceCardRef.current.getBoundingClientRect().top;
      setDense(inFlowTop <= floatTop);
    }, [])
  );

  const openSetting = useCallback(() => {
    workspaceDialogService.open('setting', {
      activeTab: 'appearance',
    });
  }, [workspaceDialogService]);

  return (
    <>
      <SafeArea top className={styles.root}>
        <div className={styles.headerSettingRow} />
        <div className={styles.wsSelectorAndSearch}>
          <WorkspaceSelector ref={workspaceCardRef} />
        </div>
      </SafeArea>
      {/* float */}
      <SafeArea top className={clsx(styles.root, styles.float, { dense })}>
        <WorkspaceSelector
          className={styles.floatWsSelector}
          ref={floatWorkspaceCardRef}
        />
        <div className={styles.headerIconActions}>
          <IconButton
            className={styles.headerIconActionButton}
            style={{ transition: 'none' }}
            onClick={navSearch}
            size="24"
            icon={<SearchIcon />}
            aria-label={t['Quick search']()}
            data-testid="mobile-quick-search-button"
          />
          <NotificationButton iconOnly />
          <IconButton
            className={styles.headerIconActionButton}
            style={{ transition: 'none' }}
            onClick={openSetting}
            size="24"
            icon={<SettingsIcon />}
            data-testid="settings-button"
          />
        </div>
      </SafeArea>
    </>
  );
};
