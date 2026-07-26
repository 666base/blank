import type { Workspace } from '@affine/core/modules/workspace';
import { useCallback } from 'react';

interface ConfirmEnableCloudOptions {
  onSuccess?: () => void;
  onFinished?: () => void;
  openPageId?: string;
  serverId?: string;
}

/**
 * Blank: AFFiNE Cloud enablement is disabled. No-op.
 */
export const useEnableCloud = () => {
  return useCallback((_ws: Workspace, options?: ConfirmEnableCloudOptions) => {
    options?.onFinished?.();
  }, []);
};
