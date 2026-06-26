import { type ColorScheme } from '@blocksuite/blank-model';
import { getBlankPlaceholderFillColor } from '@blocksuite/blank-shared/theme';

export function getSurfacePlaceholderFallback(colorScheme: ColorScheme) {
  return getBlankPlaceholderFillColor(colorScheme);
}

export function resolveSurfacePlaceholderColor(colorScheme: ColorScheme) {
  return getSurfacePlaceholderFallback(colorScheme);
}
