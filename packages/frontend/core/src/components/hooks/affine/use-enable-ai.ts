import { BLANK_PRODUCT } from '@affine/core/modules/blank';

/**
 * Blank: AI / Copilot is fully disabled.
 */
export const useEnableAI = () => {
  if (BLANK_PRODUCT.disableAi) {
    return false;
  }
  return false;
};
