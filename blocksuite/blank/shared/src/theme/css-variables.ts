/* CSS variables. You need to handle all places where `CSS variables` are marked. */

import { LINE_COLORS } from '@blocksuite/blank-model';
import {
  type BlankCssVariables,
  type BlankTheme,
  cssVar,
} from '@toeverything/theme';
export { cssVar } from '@toeverything/theme';
import { type BlankThemeKeyV2, cssVarV2 } from '@toeverything/theme/v2';
import { unsafeCSS } from 'lit';
export { cssVarV2 } from '@toeverything/theme/v2';
export const ColorVariables = [
  '--blank-brand-color',
  '--blank-primary-color',
  '--blank-secondary-color',
  '--blank-tertiary-color',
  '--blank-hover-color',
  '--blank-icon-color',
  '--blank-icon-secondary',
  '--blank-border-color',
  '--blank-divider-color',
  '--blank-placeholder-color',
  '--blank-quote-color',
  '--blank-link-color',
  '--blank-edgeless-grid-color',
  '--blank-success-color',
  '--blank-warning-color',
  '--blank-error-color',
  '--blank-processing-color',
  '--blank-text-emphasis-color',
  '--blank-text-primary-color',
  '--blank-text-secondary-color',
  '--blank-text-disable-color',
  '--blank-black-10',
  '--blank-black-30',
  '--blank-black-50',
  '--blank-black-60',
  '--blank-black-80',
  '--blank-black-90',
  '--blank-black',
  '--blank-white-10',
  '--blank-white-30',
  '--blank-white-50',
  '--blank-white-60',
  '--blank-white-80',
  '--blank-white-90',
  '--blank-white',
  '--blank-background-code-block',
  '--blank-background-tertiary-color',
  '--blank-background-processing-color',
  '--blank-background-error-color',
  '--blank-background-warning-color',
  '--blank-background-success-color',
  '--blank-background-primary-color',
  '--blank-background-secondary-color',
  '--blank-background-modal-color',
  '--blank-background-overlay-panel-color',
  '--blank-tag-blue',
  '--blank-tag-green',
  '--blank-tag-teal',
  '--blank-tag-white',
  '--blank-tag-purple',
  '--blank-tag-red',
  '--blank-tag-pink',
  '--blank-tag-yellow',
  '--blank-tag-orange',
  '--blank-tag-gray',
  ...LINE_COLORS,
  '--blank-tooltip',
  '--blank-blue',
];

export const SizeVariables = [
  '--blank-font-h-1',
  '--blank-font-h-2',
  '--blank-font-h-3',
  '--blank-font-h-4',
  '--blank-font-h-5',
  '--blank-font-h-6',
  '--blank-font-base',
  '--blank-font-sm',
  '--blank-font-xs',
  '--blank-line-height',
  '--blank-z-index-modal',
  '--blank-z-index-popover',
];

export const FontFamilyVariables = [
  '--blank-font-family',
  '--blank-font-number-family',
  '--blank-font-code-family',
];

export const StyleVariables = [
  '--blank-editor-width',

  '--blank-theme-mode',
  '--blank-editor-mode',
  /* --blank-palette-transparent: special values added for the sake of logical consistency. */
  '--blank-palette-transparent',

  '--blank-popover-shadow',
  '--blank-menu-shadow',
  '--blank-float-button-shadow',
  '--blank-shadow-1',
  '--blank-shadow-2',
  '--blank-shadow-3',

  '--blank-paragraph-space',
  '--blank-popover-radius',
  '--blank-scale',
  ...SizeVariables,
  ...ColorVariables,
  ...FontFamilyVariables,
] as const;

type VariablesType = typeof StyleVariables;
export type CssVariableName = Extract<
  VariablesType[keyof VariablesType],
  string
>;

export type CssVariablesMap = Record<CssVariableName, string>;

export const unsafeCSSVar = (
  key: keyof BlankCssVariables | keyof BlankTheme,
  fallback?: string
) => unsafeCSS(cssVar(key, fallback));

export const unsafeCSSVarV2 = (key: BlankThemeKeyV2, fallback?: string) =>
  unsafeCSS(cssVarV2(key, fallback));
