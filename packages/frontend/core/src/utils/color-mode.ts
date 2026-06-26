export const COLOR_MODES = ['dark', 'light', 'gray', 'paper'] as const;

export type ColorMode = (typeof COLOR_MODES)[number];

export function isDarkColorMode(theme?: string | null): boolean {
  return theme === 'dark' || theme === 'gray';
}

export function isLightColorMode(theme?: string | null): boolean {
  return theme === 'light' || theme === 'paper';
}

export function normalizeColorMode(theme?: string | null): ColorMode {
  if (theme && COLOR_MODES.includes(theme as ColorMode)) {
    return theme as ColorMode;
  }
  return 'dark';
}
