import { useLayoutEffect } from 'react';

import { applyStatusBarColor } from '../utils/status-bar-color';
import { useThemeValueV1, useThemeValueV2 } from './use-theme-value';

export const useThemeColorMeta = (color: string) => {
  useLayoutEffect(() => {
    return applyStatusBarColor(color, { trackForRestore: true });
  }, [color]);
};

export const useThemeColorV1 = (
  ...args: Parameters<typeof useThemeValueV1>
) => {
  useThemeColorMeta(useThemeValueV1(...args));
};

export const useThemeColorV2 = (
  ...args: Parameters<typeof useThemeValueV2>
) => {
  useThemeColorMeta(useThemeValueV2(...args));
};
