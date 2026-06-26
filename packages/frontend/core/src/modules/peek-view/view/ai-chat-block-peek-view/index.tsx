import { toReactNode } from '@blank/component';
import { AIChatBlockPeekViewTemplate } from '@blank/core/blocksuite/ai';
import type { AIChatBlockModel } from '@blank/core/blocksuite/ai/blocks/ai-chat-block/model/ai-chat-model';
import { registerAIAppEffects } from '@blank/core/blocksuite/ai/effects/app';
import { useAIChatConfig } from '@blank/core/components/hooks/blank/use-ai-chat-config';
import { useAISubscribe } from '@blank/core/components/hooks/blank/use-ai-subscribe';
import {
  AIDraftService,
  AIToolsConfigService,
} from '@blank/core/modules/ai-button';
import { AIModelService } from '@blank/core/modules/ai-button/services/models';
import { ServerService, SubscriptionService } from '@blank/core/modules/cloud';
import { WorkspaceDialogService } from '@blank/core/modules/dialogs';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import type { EditorHost } from '@blocksuite/blank/std';
import { useFramework } from '@toeverything/infra';
import { useMemo } from 'react';

registerAIAppEffects();

export type AIChatBlockPeekViewProps = {
  model: AIChatBlockModel;
  host: EditorHost;
};

export const AIChatBlockPeekView = ({
  model,
  host,
}: AIChatBlockPeekViewProps) => {
  const { docDisplayConfig, searchMenuConfig, reasoningConfig } =
    useAIChatConfig();

  const framework = useFramework();
  const serverService = framework.get(ServerService);
  const blankFeatureFlagService = framework.get(FeatureFlagService);
  const blankWorkspaceDialogService = framework.get(WorkspaceDialogService);
  const aiDraftService = framework.get(AIDraftService);
  const aiToolsConfigService = framework.get(AIToolsConfigService);
  const subscriptionService = framework.get(SubscriptionService);
  const aiModelService = framework.get(AIModelService);
  const handleAISubscribe = useAISubscribe();

  return useMemo(() => {
    const template = AIChatBlockPeekViewTemplate(
      model,
      host,
      docDisplayConfig,
      searchMenuConfig,
      reasoningConfig,
      serverService,
      blankFeatureFlagService,
      blankWorkspaceDialogService,
      aiDraftService,
      aiToolsConfigService,
      subscriptionService,
      aiModelService,
      handleAISubscribe
    );
    return toReactNode(template);
  }, [
    model,
    host,
    docDisplayConfig,
    searchMenuConfig,
    reasoningConfig,
    serverService,
    blankFeatureFlagService,
    blankWorkspaceDialogService,
    aiDraftService,
    aiToolsConfigService,
    subscriptionService,
    aiModelService,
    handleAISubscribe,
  ]);
};
