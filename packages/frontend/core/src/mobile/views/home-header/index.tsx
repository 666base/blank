import {
  IconButton,
  SafeArea,
  startScopedViewTransition,
  Menu,
  MenuItem,
  usePromptModal,
} from '@blank/component';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { isBlankBuild } from '@blank/core/utils/blank-links';
import { preferInstantNavigation } from '@blank/core/utils/blank-mobile-perf';
import { useI18n } from '@blank/i18n';
import { SearchIcon, SettingsIcon, PlusIcon, PageIcon, FolderIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useNavigateHelper } from '@blank/core/components/hooks/use-navigate-helper';
import { CollectionService } from '@blank/core/modules/collection';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { usePageHelper } from '@blank/core/blocksuite/block-suite-page-list/utils';
import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

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

  const navigateHelper = useNavigateHelper();
  const collectionService = useService(CollectionService);
  const currentWorkspace = useService(WorkspaceService).workspace;
  const { createPage } = usePageHelper(currentWorkspace.docCollection);
  const { openPromptModal } = usePromptModal();

  const handleCreateCollection = useCallback(() => {
    openPromptModal({
      title: t['com.blank.editCollection.saveCollection'](),
      label: t['com.blank.editCollectionName.name'](),
      inputOptions: {
        placeholder: t['com.blank.editCollectionName.name.placeholder'](),
      },
      children: t['com.blank.editCollectionName.createTips'](),
      confirmText: t['com.blank.editCollection.save'](),
      cancelText: t['com.blank.editCollection.button.cancel'](),
      confirmButtonOptions: {
        variant: 'primary',
      },
      onConfirm(name) {
        const id = collectionService.createCollection({ name });
        navigateHelper.jumpToCollection(currentWorkspace.id, id);
      },
    });
  }, [
    collectionService,
    currentWorkspace.id,
    navigateHelper,
    openPromptModal,
    t,
  ]);

  const handleCreatePage = useCallback(() => {
    startScopedViewTransition(
      searchVTScope,
      () => {
        const doc = createPage();
        navigateHelper.jumpToPage(currentWorkspace.id, doc.id);
      },
      { instant: preferInstantNavigation() }
    );
  }, [createPage, currentWorkspace.id, navigateHelper]);

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
        {!hideWorkspaceSelector ? (
          <div className={styles.wsSelectorAndSearch}>
            <WorkspaceSelector ref={workspaceCardRef} />
            <div style={{ fontSize: 22, fontWeight: 600 }}>{t['Recent']()}</div>
          </div>
        ) : (
          <div style={{ fontSize: 22, fontWeight: 600, paddingLeft: 16 }}>{t['Recent']()}</div>
        )}
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
          <>
            <WorkspaceSelector
              className={styles.floatWsSelector}
              ref={floatWorkspaceCardRef}
            />
            <div style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>{t['Recent']()}</div>
          </>
        ) : (
          <div style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>{t['Recent']()}</div>
        )}
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
          <Menu
            items={
              <>
                <MenuItem
                  prefixIcon={<PageIcon />}
                  onClick={handleCreatePage}
                >
                  {t['New Page']()}
                </MenuItem>
                <MenuItem
                  prefixIcon={<FolderIcon />}
                  onClick={handleCreateCollection}
                >
                  {t['New Folder']()}
                </MenuItem>
              </>
            }
          >
            <IconButton
              className={styles.headerIconActionButton}
              style={{ transition: 'none' }}
              size="24"
              icon={<PlusIcon />}
              data-testid="mobile-create-button"
            />
          </Menu>
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
