import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';
export const navWrapperStyle = style({
  '@media': {
    print: {
      display: 'none',
      zIndex: -1,
    },
  },
  paddingBottom: 8,
  backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
  selectors: {
    '&[data-has-border=true]': {
      borderRight: `1px solid var(--blank-border, ${cssVarV2('layer/insideBorder/border')})`,
    },
    '&[data-is-floating="true"], &[data-is-electron="false"]': {
      backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
    },
  },
});
export const hoverNavWrapperStyle = style({
  selectors: {
    '&[data-is-floating="true"]': {
      backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
      height: 'calc(100% - 60px)',
      marginTop: '52px',
      marginLeft: '4px',
      boxShadow: cssVar('--affine-popover-shadow'),
      borderRadius: '8px',
    },
    '&[data-is-floating="true"][data-is-electron="true"]': {
      height: '100%',
      marginTop: '-4px',
    },
    '&[data-is-floating="true"][data-client-border="true"]': {
      backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
    },
    '&[data-is-floating="true"][data-client-border="true"]::before': {
      display: 'none',
    },
  },
});
export const navHeaderButton = style({
  width: '28px',
  height: '28px',
  flexShrink: 0,
});
export const navHeaderNavigationButtons = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '16px',
});
export const navStyle = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--blank-bg-secondary, #fafaf9)',
});
export const navHeaderStyle = style({
  flex: '0 0 auto',
  height: 'var(--blank-titlebar-height, 44px)',
  padding: '0px 10px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

export const navBodyStyle = style({
  flex: '1 1 auto',
  height: 'calc(100% - var(--blank-titlebar-height, 44px))',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '4px',
});
export const sidebarFloatMaskStyle = style({
  transition: 'opacity .15s',
  opacity: 0,
  pointerEvents: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: '100%',
  bottom: 0,
  background: cssVarV2('layer/background/modal'),
  selectors: {
    '&[data-open="true"][data-is-floating="true"]': {
      opacity: 1,
      pointerEvents: 'auto',
      right: '0',
      zIndex: 3,
    },
  },
  '@media': {
    print: {
      display: 'none',
    },
  },
});

export const resizeHandleShortcutStyle = style({
  alignItems: 'flex-end',
  marginBottom: '2px',
});
