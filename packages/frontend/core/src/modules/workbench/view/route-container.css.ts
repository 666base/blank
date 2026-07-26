import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  height: '100%',
  overflow: 'clip',
  width: '100%',
  position: 'relative',
  flexDirection: 'column',
  minWidth: 0,
  background: 'var(--blank-bg, #ffffff)',
});

export const header = style({
  display: 'flex',
  height: 'var(--blank-titlebar-height, 44px)',
  width: '100%',
  alignItems: 'center',
  flexShrink: 0,
  background: 'var(--blank-bg, #ffffff)',
  padding: '0 12px',
  contain: 'strict',
  borderBottom: 'none',
  '@media': {
    print: {
      display: 'none',
    },
  },
  selectors: {
    '&[data-show-switch=true]': {
      paddingLeft: 8,
    },
  },
});

export const headerMacPad = style({
  paddingLeft: 88,
});

export const viewBodyContainer = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  contain: 'strict',
});

export const leftSidebarButton = style({
  margin: '0 12px 0 0',
});

export const rightSidebarButton = style({
  display: 'none',
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&[data-show=true]': {
      opacity: 1,
      width: 28,
      maxWidth: 28,
      marginLeft: 12,
    },
    '&[data-show=false]': {
      opacity: 0,
      maxWidth: 0,
      marginLeft: 0,
      pointerEvents: 'none',
    },
  },
});

export const viewHeaderContainer = style({
  display: 'flex',
  height: '100%',
  width: 0,
  flexGrow: 1,
  minWidth: 12,
});
