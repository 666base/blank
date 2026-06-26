import { useConfirmModal } from '@blank/component';
import {
  AIAppEvents,
  AIChatRuntime,
  createAIRequestService,
  DocAIChatSessionStrategy,
  useAIChatElement,
  useAIChatRuntime,
} from '@blank/core/blocksuite/ai';
import type { AppSidebarConfig } from '@blank/core/blocksuite/ai/chat-panel/chat-config';
import { AIChatContent } from '@blank/core/blocksuite/ai/components/ai-chat-content';
import {
  AIChatTabs,
  AIChatToolbar,
  configureAIChatToolbar,
} from '@blank/core/blocksuite/ai/components/ai-chat-toolbar';
import { createPlaygroundModal } from '@blank/core/blocksuite/ai/components/playground/modal';
import { registerAIAppEffects } from '@blank/core/blocksuite/ai/effects/app';
import type { BlankEditorContainer } from '@blank/core/blocksuite/block-suite-editor';
import { NotificationServiceImpl } from '@blank/core/blocksuite/view-extensions/editor-view/notification-service';
import { useAIChatConfig } from '@blank/core/components/hooks/blank/use-ai-chat-config';
import { useAISpecs } from '@blank/core/components/hooks/blank/use-ai-specs';
import { useAISubscribe } from '@blank/core/components/hooks/blank/use-ai-subscribe';
import {
  AIDraftService,
  AIToolsConfigService,
} from '@blank/core/modules/ai-button';
import { AIModelService } from '@blank/core/modules/ai-button/services/models';
import {
  EventSourceService,
  GraphQLService,
  ServerService,
  SubscriptionService,
} from '@blank/core/modules/cloud';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { useSignalValue } from '@blank/core/modules/doc-info/utils';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import { PeekViewService } from '@blank/core/modules/peek-view';
import { NbstoreService } from '@blank/core/modules/storage';
import { AppThemeService } from '@blank/core/modules/theme';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { useI18n } from '@blank/i18n';
import { RefNodeSlotsProvider } from '@blocksuite/blank/inlines/reference';
import { DocModeProvider } from '@blocksuite/blank/shared/services';
import { createSignalFromObservable } from '@blocksuite/blank/shared/utils';
import type { Store } from '@blocksuite/blank/store';
import { CenterPeekIcon, Logo1Icon } from '@blocksuite/icons/rc';
import type { Signal } from '@preact/signals-core';
import { useFramework, useService } from '@toeverything/infra';
import { html } from 'lit';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as styles from './chat.css';

registerAIAppEffects();

const shouldResetChatPanelOnUserInfoChange = ({
  previousUserId,
  nextUserId,
}: {
  previousUserId?: string | null;
  nextUserId?: string | null;
}) => previousUserId !== undefined && previousUserId !== nextUserId;

export interface SidebarTabProps {
  editor: BlankEditorContainer | null;
  doc: Store;
  onLoad?: ((component: HTMLElement) => void) | null;
}

export const EditorChatPanel = ({
  editor,
  doc: fallbackDoc,
  onLoad,
}: SidebarTabProps) => {
  const framework = useFramework();
  const graphqlService = useService(GraphQLService);
  const eventSourceService = useService(EventSourceService);
  const nbstoreService = useService(NbstoreService);
  const workbench = useService(WorkbenchService).workbench;
  const t = useI18n();

  const { closeConfirmModal, openConfirmModal } = useConfirmModal();
  const notificationService = useMemo(
    () => new NotificationServiceImpl(closeConfirmModal, openConfirmModal),
    [closeConfirmModal, openConfirmModal]
  );
  const specs = useAISpecs();
  const handleAISubscribe = useAISubscribe();

  const {
    docDisplayConfig,
    searchMenuConfig,
    reasoningConfig,
    playgroundConfig,
  } = useAIChatConfig();
  const playgroundVisible = useSignalValue(playgroundConfig.visible) ?? false;

  const [isBodyProvided, setIsBodyProvided] = useState(false);
  const [isHeaderProvided, setIsHeaderProvided] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const chatToolbarContainerRef = useRef<HTMLDivElement | null>(null);
  const chatTabsContainerRef = useRef<HTMLDivElement | null>(null);
  const userIdRef = useRef<string | null | undefined>(undefined);

  const doc = editor?.doc ?? fallbackDoc;
  const host = editor?.host;
  const workspaceId = doc?.workspace.id;
  const requestService = useMemo(
    () =>
      createAIRequestService(
        graphqlService.gql,
        eventSourceService.eventSource,
        nbstoreService.realtime
      ),
    [eventSourceService.eventSource, graphqlService.gql, nbstoreService]
  );

  const [pendingSessionId] = useState(() => {
    const searchParams = new URLSearchParams(workbench.location$.value.search);
    return searchParams.get('sessionId') ?? undefined;
  });

  useEffect(() => {
    if (pendingSessionId) {
      workbench.activeView$.value.updateQueryString(
        { sessionId: undefined },
        { replace: true }
      );
    }
  }, [pendingSessionId, workbench]);

  const runtime = useMemo(() => {
    if (!doc || !workspaceId) return null;
    return new AIChatRuntime({
      request: requestService,
      scope: {
        kind: 'doc',
        workspaceId,
        docId: doc.id,
        pendingSessionId,
      },
      strategy: new DocAIChatSessionStrategy(),
    });
  }, [doc, pendingSessionId, requestService, workspaceId]);
  const snapshot = useAIChatRuntime(runtime);
  const session =
    snapshot?.sessions.find(
      item => item.sessionId === snapshot.activeSessionId
    ) ?? null;
  const appSidebarConfig = useMemo<AppSidebarConfig>(() => {
    return {
      getWidth: () =>
        createSignalFromObservable<number | undefined>(
          workbench.sidebarWidth$.asObservable(),
          0
        ),
      isOpen: () =>
        createSignalFromObservable<boolean | undefined>(
          workbench.sidebarOpen$.asObservable(),
          true
        ),
    };
  }, [workbench]);

  const [sidebarWidthSignal, setSidebarWidthSignal] =
    useState<Signal<number | undefined>>();

  useEffect(() => {
    const { signal, cleanup } = appSidebarConfig.getWidth();
    setSidebarWidthSignal(signal);
    return cleanup;
  }, [appSidebarConfig]);

  const openSession = useCallback(
    async (sessionId: string) => {
      if (session?.sessionId === sessionId || !runtime) {
        return;
      }
      await runtime.dispatch({ type: 'openSession', sessionId });
    },
    [runtime, session?.sessionId]
  );

  const openDoc = useCallback(
    async (docId: string, sessionId?: string) => {
      if (!doc) {
        return;
      }
      if (doc.id === docId) {
        if (session?.sessionId === sessionId || session?.pinned) {
          return;
        }
        if (sessionId) {
          await openSession(sessionId);
        }
        return;
      }
      if (session?.pinned || !sessionId) {
        workbench.open(`/${docId}`, { at: 'active' });
        return;
      }
      workbench.open(`/${docId}?sessionId=${sessionId}`, { at: 'active' });
    },
    [doc, openSession, session?.pinned, session?.sessionId, workbench]
  );

  useEffect(() => {
    const navigationRequest = snapshot?.navigationRequest;
    if (!navigationRequest) {
      return;
    }
    workbench.open(
      `/${navigationRequest.docId}?sessionId=${navigationRequest.sessionId}`,
      { at: 'active' }
    );
  }, [snapshot?.navigationRequest, workbench]);

  const deleteSession = useCallback(
    async (sessionToDelete: BlockSuitePresets.AIRecentSession) => {
      if (!runtime) return;
      const confirm = await notificationService.confirm({
        title: t['com.blank.ai.chat-panel.session.delete.confirm.title'](),
        message: t['com.blank.ai.chat-panel.session.delete.confirm.message'](),
        confirmText: t['Delete'](),
        cancelText: t['Cancel'](),
      });
      if (!confirm) return;
      await runtime.dispatch({
        type: 'deleteSession',
        sessionId: sessionToDelete.sessionId,
      });
      notificationService.toast(
        t['com.blank.ai.chat-panel.session.delete.toast.success'](),
        {}
      );
    },
    [notificationService, runtime, t]
  );

  useEffect(() => {
    userIdRef.current ??= AIAppEvents.userInfo.value?.id ?? null;
    const subscription = AIAppEvents.userInfo.subscribe(userInfo => {
      const nextUserId = userInfo?.id ?? null;
      const shouldReset = shouldResetChatPanelOnUserInfoChange({
        previousUserId: userIdRef.current,
        nextUserId,
      });
      userIdRef.current = nextUserId;
      if (!shouldReset) {
        return;
      }
      runtime?.dispatch({ type: 'initialize' }).catch(console.error);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [runtime]);

  const chatContent = useAIChatElement({
    containerRef: chatContainerRef,
    selector: 'ai-chat-content',
    enabled: isBodyProvided && !!runtime && !!snapshot,
    createElement: () => new AIChatContent(),
    configureElement: content => {
      if (!runtime || !snapshot) return;
      content.host = host;
      content.session = session;
      content.runtime = runtime;
      content.runtimeSnapshot = snapshot;
      content.workspaceId = doc.workspace.id;
      content.docId = doc.id;
      content.reasoningConfig = reasoningConfig;
      content.searchMenuConfig = searchMenuConfig;
      content.docDisplayConfig = docDisplayConfig;
      content.extensions = specs;
      content.serverService = framework.get(ServerService);
      content.blankFeatureFlagService = framework.get(FeatureFlagService);
      content.blankWorkspaceDialogService = framework.get(
        WorkspaceDialogService
      );
      content.blankThemeService = framework.get(AppThemeService);
      content.notificationService = notificationService;
      content.aiDraftService = framework.get(AIDraftService);
      content.aiToolsConfigService = framework.get(AIToolsConfigService);
      content.peekViewService = framework.get(PeekViewService);
      content.subscriptionService = framework.get(SubscriptionService);
      content.aiModelService = framework.get(AIModelService);
      content.onAISubscribe = handleAISubscribe;
      content.width = sidebarWidthSignal;
      content.onOpenDoc = (docId: string, sessionId?: string) => {
        openDoc(docId, sessionId).catch(console.error);
      };
    },
    onElementReady: content => {
      onLoad?.(content);
    },
  });

  useAIChatElement({
    containerRef: chatToolbarContainerRef,
    selector: 'ai-chat-toolbar',
    enabled: isHeaderProvided && !!runtime && !!snapshot,
    createElement: () => new AIChatToolbar(),
    configureElement: tool => {
      if (!runtime || !snapshot) return;
      configureAIChatToolbar(tool, {
        session,
        runtime,
        runtimeSnapshot: snapshot,
        docId: doc.id,
        docDisplayConfig,
        notificationService,
        onOpenDoc: (docId: string, sessionId: string) => {
          openDoc(docId, sessionId).catch(console.error);
        },
        onSessionDelete: (
          sessionToDelete: BlockSuitePresets.AIRecentSession
        ) => {
          deleteSession(sessionToDelete).catch(console.error);
        },
      });
    },
  });

  useAIChatElement({
    containerRef: chatTabsContainerRef,
    selector: 'ai-chat-tabs',
    enabled: !!runtime && !!snapshot,
    createElement: () => new AIChatTabs(),
    configureElement: tabs => {
      if (!runtime || !snapshot) return;
      tabs.runtime = runtime;
      tabs.runtimeSnapshot = snapshot;
    },
  });

  useEffect(() => {
    if (!editor?.host || !chatContent) {
      return;
    }
    const docModeService = editor.host.std.get(DocModeProvider);
    const refNodeService = editor.host.std.getOptional(RefNodeSlotsProvider);
    const disposable = [
      refNodeService?.docLinkClicked.subscribe(({ host: clickedHost }) => {
        if (clickedHost === editor.host) {
          chatContent.docId = editor.doc.id;
        }
      }),
      docModeService?.onPrimaryModeChange(() => {
        if (!editor.host) {
          return;
        }
        chatContent.host = editor.host;
      }, editor.doc.id),
    ];

    return () => disposable.forEach(item => item?.unsubscribe());
  }, [chatContent, editor]);

  const [autoResized, setAutoResized] = useState(false);
  useEffect(() => {
    if (autoResized) {
      return;
    }
    const subscription = AIAppEvents.previewPanelOpenChange.subscribe(open => {
      if (!open) {
        return;
      }
      const sidebarWidth = workbench.sidebarWidth$.value;
      const minSidebarWidth = 1080;
      if (!sidebarWidth || sidebarWidth < minSidebarWidth) {
        workbench.setSidebarWidth(minSidebarWidth);
        setAutoResized(true);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [autoResized, workbench]);

  const openPlayground = useCallback(() => {
    if (!doc || !host) {
      return;
    }
    const playgroundContent = html`
      <playground-content
        .host=${host}
        .doc=${doc}
        .reasoningConfig=${reasoningConfig}
        .playgroundConfig=${playgroundConfig}
        .appSidebarConfig=${appSidebarConfig}
        .searchMenuConfig=${searchMenuConfig}
        .docDisplayConfig=${docDisplayConfig}
        .extensions=${specs}
        .serverService=${framework.get(ServerService)}
        .blankFeatureFlagService=${framework.get(FeatureFlagService)}
        .blankThemeService=${framework.get(AppThemeService)}
        .notificationService=${notificationService}
        .blankWorkspaceDialogService=${framework.get(WorkspaceDialogService)}
        .aiToolsConfigService=${framework.get(AIToolsConfigService)}
        .subscriptionService=${framework.get(SubscriptionService)}
        .aiModelService=${framework.get(AIModelService)}
      ></playground-content>
    `;

    createPlaygroundModal(playgroundContent, 'AI Playground');
  }, [
    appSidebarConfig,
    doc,
    docDisplayConfig,
    framework,
    host,
    notificationService,
    playgroundConfig,
    reasoningConfig,
    searchMenuConfig,
    specs,
  ]);

  const onChatContainerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    setIsBodyProvided(true);
    chatContainerRef.current = node;
  }, []);

  const onChatToolContainerRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    setIsHeaderProvided(true);
    chatToolbarContainerRef.current = node;
  }, []);

  const onChatTabsContainerRef = useCallback((node: HTMLDivElement | null) => {
    chatTabsContainerRef.current = node;
  }, []);

  const embeddingCount = snapshot?.composer.context.embeddingCount;
  const done = embeddingCount?.finished ?? 0;
  const total =
    done + (embeddingCount?.processing ?? 0) + (embeddingCount?.failed ?? 0);
  const isEmbedding = total > 0 && done < total;
  const hasRuntimeSnapshot = !!snapshot;

  return (
    <div className={styles.root}>
      {!hasRuntimeSnapshot ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <Logo1Icon className={styles.loadingIcon} />
            <div className={styles.loadingTitle}>
              {t['com.blank.ai.chat-panel.loading-history']()}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>
              {isEmbedding ? (
                <span data-testid="chat-panel-embedding-progress">
                  {t.t('com.blank.ai.chat-panel.embedding-progress', {
                    done,
                    total,
                  })}
                </span>
              ) : (
                t['com.blank.ai.chat-panel.title']()
              )}
            </div>
            {playgroundVisible ? (
              <div className={styles.playground} onClick={openPlayground}>
                <CenterPeekIcon />
              </div>
            ) : null}
            <div
              className={styles.tabsContainer}
              ref={onChatTabsContainerRef}
            />
            <div ref={onChatToolContainerRef} />
          </div>
          <div className={styles.content} ref={onChatContainerRef} />
        </div>
      )}
    </div>
  );
};
