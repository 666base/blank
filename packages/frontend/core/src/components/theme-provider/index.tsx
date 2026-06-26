import { AppThemeService } from '@blank/core/modules/theme';
import {
  COLOR_MODES,
  normalizeColorMode,
} from '@blank/core/utils/color-mode';
import { useService } from '@toeverything/infra';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

const themes = [...COLOR_MODES];

function ThemeObserver() {
  const { resolvedTheme } = useTheme();
  const service = useService(AppThemeService);

  useEffect(() => {
    service.appTheme.theme$.next(resolvedTheme);
  }, [resolvedTheme, service.appTheme.theme$]);

  return null;
}

function ThemeMigrator() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const normalized = normalizeColorMode(theme);
    if (theme !== normalized) {
      setTheme(normalized);
    }
  }, [setTheme, theme]);

  return null;
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider
      themes={themes}
      enableSystem={false}
      defaultTheme="dark"
    >
      {children}
      <ThemeMigrator />
      <ThemeObserver />
    </NextThemeProvider>
  );
};
