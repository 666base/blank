import { ServerService } from '@blank/core/modules/cloud';
import { FeatureFlagService } from '@blank/core/modules/feature-flag';
import { isAiDisabled } from '@blank/core/utils/local-only';
import { useLiveData, useService } from '@toeverything/infra';

export const useEnableAI = () => {
  const featureFlagService = useService(FeatureFlagService);
  const aiFeature = useLiveData(featureFlagService.flags.enable_ai.$);

  const serverService = useService(ServerService);
  const serverConfig = useLiveData(serverService.server.features$);
  const aiConfig = serverConfig?.copilot;

  if (isAiDisabled()) {
    return false;
  }

  return aiFeature && aiConfig;
};
