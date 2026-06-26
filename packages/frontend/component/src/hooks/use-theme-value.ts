import { type BlankTheme, darkTheme, lightTheme } from '@toeverything/theme';
import {
  type BlankThemeKeyV2,
  darkThemeV2,
  lightThemeV2,
} from '@toeverything/theme/v2';
import { isDarkColorMode } from '@blank/core/utils/color-mode';
import { useTheme } from 'next-themes';

export const useThemeValueV2 = (key: BlankThemeKeyV2) => {
  const { resolvedTheme } = useTheme();

  return isDarkColorMode(resolvedTheme)
    ? darkThemeV2[key]
    : lightThemeV2[key];
};

export const useThemeValueV1 = (key: keyof Omit<BlankTheme, 'editorMode'>) => {
  const { resolvedTheme } = useTheme();

  return isDarkColorMode(resolvedTheme) ? darkTheme[key] : lightTheme[key];
};
