import { cssVar } from '@toeverything/theme';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  height: '100%',
  overflow: 'clip',
  width: '100%',
  position: 'relative',
  flexDirection: 'column',
  minWidth: 0,
  background: cssVar('backgroundPrimaryColor'),
});

export const header = style({
  display: 'flex',
  height: '52px',
  width: '100%',
  alignItems: 'center',
  flexShrink: 0,
  background: cssVar('backgroundPrimaryColor'),
  padding: `0 var(--sp-4)`,
  contain: 'strict',
  '@media': {
    print: {
      display: 'none',
    },
  },
  selectors: {
    '&[data-show-switch=true]': {
      paddingLeft: 'var(--sp-2)',
    },
  },
});

export const viewBodyContainer = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  contain: 'strict',
});

export const leftSidebarButton = style({
  margin: `0 var(--sp-4) 0 0`,
});

export const rightSidebarButton = style({
  transition: `all var(--duration-normal) var(--ease-default)`,
  selectors: {
    '&[data-show=true]': {
      opacity: 1,
      width: 32,
      maxWidth: 32,
      marginLeft: 'var(--sp-4)',
    },
    '&[data-show=false]': {
      opacity: 0,
      maxWidth: 0,
      marginLeft: 0,
      // prevent click event from being triggered
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
