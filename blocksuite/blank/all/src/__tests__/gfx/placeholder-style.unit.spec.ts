import { ColorScheme } from '@blocksuite/blank-model';
import { describe, expect, it } from 'vitest';

import {
  getBlankPlaceholderFillColor,
  getBlankPlaceholderStrokeColor,
  inferColorSchemeFromThemeMode,
} from '../../../../shared/src/theme/placeholder-style.js';

describe('blank placeholder style', () => {
  it('returns subtle light placeholder colors', () => {
    expect(getBlankPlaceholderFillColor(ColorScheme.Light)).toBe(
      'rgba(0, 0, 0, 0.04)'
    );
    expect(getBlankPlaceholderStrokeColor(ColorScheme.Light)).toBe(
      'rgba(0, 0, 0, 0.02)'
    );
  });

  it('returns subtle dark placeholder colors', () => {
    expect(getBlankPlaceholderFillColor(ColorScheme.Dark)).toBe(
      'rgba(255, 255, 255, 0.08)'
    );
    expect(getBlankPlaceholderStrokeColor(ColorScheme.Dark)).toBe(
      'rgba(255, 255, 255, 0.04)'
    );
  });

  it('infers color scheme from theme mode', () => {
    expect(inferColorSchemeFromThemeMode('dark')).toBe(ColorScheme.Dark);
    expect(inferColorSchemeFromThemeMode('light')).toBe(ColorScheme.Light);
    expect(inferColorSchemeFromThemeMode('')).toBe(ColorScheme.Light);
  });
});
