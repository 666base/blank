import {
  IconButton,
  SafeArea,
  startScopedViewTransition,
} from '@blank/component';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { preferInstantNavigation } from '@blank/core/utils/blank-mobile-perf';
import { useI18n } from '@blank/i18n';
import { SearchIcon, SettingsIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

import { NotificationButton } from '../../../components/root-app-sidebar/notification-button';
import { MobileProfileButton } from '../../components/profile-button';
import { WorkspaceSelector } from '../../components';
import { searchVTScope } from '../../components/search-input/style.css';
import { useGlobalEvent } from '../../hooks/use-global-events';
import * as styles from './styles.css';

/**
 * Contains workspace selector plus floating actions (search, notifications, settings).
 */
export const HomeHeader = () => {
  const workspaceDialogService = useService(WorkspaceDialogService);
  const hideWorkspaceSelector = isBlankBuild();

  const workspaceCardRef = useRef<HTMLDivElement>(null);
  const floatWorkspaceCardRef = useRef<HTMLDivElement>(null);
  const t = useI18n();
  const workbench = useService(WorkbenchService).workbench;

  const navSearch = useCallback(() => {
    startScopedViewTransition(
      searchVTScope,
      () => {
        workbench.open('/search');
      },
      { instant: preferInstantNavigation() }
    );
  }, [workbench]);

  const [dense, setDense] = useState(false);
  const denseRef = useRef(false);
  const scrollFrameRef = useRef(0);

  useGlobalEvent(
    'scroll',
    useCallback(() => {
      if (scrollFrameRef.current) {
        return;
      }
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = 0;
        if (!workspaceCardRef.current || !floatWorkspaceCardRef.current) {
          return;
        }
        const inFlowTop = workspaceCardRef.current.getBoundingClientRect().top;
        const floatTop =
          floatWorkspaceCardRef.current.getBoundingClientRect().top;
        const nextDense = inFlowTop <= floatTop;
        if (nextDense !== denseRef.current) {
          denseRef.current = nextDense;
          setDense(nextDense);
        }
      });
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
        {!hideWorkspaceSelector ? (
          <div className={styles.wsSelectorAndSearch}>
            <WorkspaceSelector ref={workspaceCardRef} />
          </div>
        ) : null}
      </SafeArea>
      {/* float */}
      <SafeArea
        top
        className={clsx(styles.root, styles.float, {
          dense,
          [styles.floatActionsOnly]: hideWorkspaceSelector,
        })}
      >
        {!hideWorkspaceSelector ? (
          <WorkspaceSelector
            className={styles.floatWsSelector}
            ref={floatWorkspaceCardRef}
          />
        ) : null}
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
          <MobileProfileButton className={styles.headerIconActionButton} />
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
