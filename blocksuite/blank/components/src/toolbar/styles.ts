import {
  type BlankCssVariables,
  combinedDarkCssVariables,
  combinedLightCssVariables,
} from '@toeverything/theme';
import { unsafeCSS } from 'lit';

const toolbarColorKeys: Array<keyof BlankCssVariables> = [
  '--blank-background-overlay-panel-color',
  '--blank-v2-layer-background-overlayPanel' as never,
  '--blank-v2-layer-insideBorder-blackBorder' as never,
  '--blank-v2-icon-primary' as never,
  '--blank-background-error-color',
  '--blank-background-primary-color',
  '--blank-background-tertiary-color',
  '--blank-icon-color',
  '--blank-icon-secondary',
  '--blank-border-color',
  '--blank-divider-color',
  '--blank-text-primary-color',
  '--blank-hover-color',
  '--blank-hover-color-filled',
];

export const lightToolbarStyles = (selector: string) => `
  ${selector}[data-app-theme='light'] {
    ${toolbarColorKeys
      .map(key => `${key}: ${unsafeCSS(combinedLightCssVariables[key])};`)
      .join('\n')}
  }
`;

export const darkToolbarStyles = (selector: string) => `
  ${selector}[data-app-theme='dark'] {
    ${toolbarColorKeys
      .map(key => `${key}: ${unsafeCSS(combinedDarkCssVariables[key])};`)
      .join('\n')}
  }
`;
