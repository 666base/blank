import { lightCssVariables } from '@toeverything/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const appStyle = style({
  width: '100%',
  position: 'relative',
  height: '100dvh',
  flexGrow: '1',
  display: 'flex',
  backgroundColor: 'var(--blank-bg, var(--affine-background-primary-color))',
  selectors: {
    '&.blur-background': {
      backgroundColor: 'transparent',
    },
    '&.noisy-background::before': {
      display: 'none',
    },
  },
});
globalStyle(`html[data-theme="light"] ${appStyle}`, {
  vars: {
    '--affine-noise-opacity': '0',
  },
});
globalStyle(`html[data-theme="dark"] ${appStyle}`, {
  vars: {
    '--affine-noise-opacity': '0',
  },
  '@media': {
    print: {
      vars: lightCssVariables,
    },
  },
});

export const browserAppViewContainer = style({
  display: 'flex',
  flexFlow: 'row',
  height: '100%',
  width: '100%',
  position: 'relative',
});

/** Scratch-like 2-pane shell for Tauri/web. */
export const blankShellRoot = style({
  display: 'flex',
  flexFlow: 'row',
  height: '100%',
  width: '100%',
  position: 'relative',
  backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
  overflow: 'hidden',
});

export const titlebarNoDrag = style({
  height: '100%',
  width: '100%',
  display: 'flex',
});

export const desktopAppViewContainer = style({
  display: 'flex',
  flexFlow: 'column',
  height: '100%',
  width: '100%',
});

export const desktopAppViewMain = style({
  display: 'flex',
  flexFlow: 'row',
  width: '100%',
  height: 'calc(100% - 40px)',
  position: 'relative',
});

export const desktopTabsHeader = style({
  display: 'flex',
  flexFlow: 'row',
  height: '40px',
  zIndex: 1,
  width: '100%',
  overflow: 'hidden',
});

export const mainContainerStyle = style({
  position: 'relative',
  zIndex: 0,
  width: '100%',
  display: 'flex',
  flex: 1,
  maxWidth: '100%',
  minWidth: 0,
  backgroundColor: 'var(--blank-bg, #ffffff)',
  overflow: 'hidden',

  selectors: {
    '&[data-client-border="true"]': {
      borderRadius: 0,
      padding: 0,
      '@media': {
        print: {
          overflow: 'visible',
          padding: '0px',
          borderRadius: '0px',
        },
      },
    },
    '&[data-client-border="true"][data-side-bar-open="true"]': {
      paddingLeft: 0,
    },
    '&[data-client-border="true"][data-is-desktop="true"]': {
      paddingTop: 0,
    },
    '&[data-client-border="false"][data-is-desktop="true"][data-side-bar-open="true"]':
      {
        borderTopLeftRadius: 0,
      },
    '&[data-client-border="false"][data-is-desktop="true"]': {
      borderTop: 'none',
      borderLeft: 'none',
    },
    '&[data-transparent=true]': {
      backgroundColor: 'transparent',
    },
    '&[data-blank-shell]': {
      backgroundColor: 'var(--blank-bg, #ffffff)',
    },
  },
});
