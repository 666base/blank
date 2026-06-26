import { ColorScheme } from '@blocksuite/blank-model';

export function inferColorSchemeFromThemeMode(
  themeMode?: string | null
): ColorScheme {
  return themeMode === 'dark' ? ColorScheme.Dark : ColorScheme.Light;
}

export function getBlankPlaceholderFillColor(colorScheme: ColorScheme) {
  return colorScheme === ColorScheme.Dark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.04)';
}

export function getBlankPlaceholderStrokeColor(colorScheme: ColorScheme) {
  return colorScheme === ColorScheme.Dark
    ? 'rgba(255, 255, 255, 0.04)'
    : 'rgba(0, 0, 0, 0.02)';
}
