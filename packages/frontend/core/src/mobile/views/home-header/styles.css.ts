import { cssVarV2 } from '@toeverything/theme/v2';
import { createVar, style } from '@vanilla-extract/css';

const headerHeight = createVar('headerHeight');
const wsSelectorHeight = createVar('wsSelectorHeight');
const searchHeight = createVar('searchHeight');

export const root = style({
  vars: {
    [headerHeight]: 'var(--touch-target)',
    [wsSelectorHeight]: '48px',
    [searchHeight]: 'var(--touch-target)',
  },
  width: '100dvw',
});
export const headerSettingRow = style({
  height: 'var(--touch-target)',
});
export const wsSelectorAndSearch = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
  padding: 'var(--sp-1) var(--sp-4) var(--sp-2) var(--sp-4)',
});

export const headerIconActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--sp-1)',
  flexShrink: 0,
});

export const headerIconActionButton = style({
  width: 'var(--touch-target)',
  height: 'var(--touch-target)',
  minWidth: 'var(--touch-target)',
  minHeight: 'var(--touch-target)',
});

export const float = style({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 2,
  willChange: 'background-color',

  display: 'flex',
  alignItems: 'center',
  padding: 'var(--sp-1) 10px var(--sp-1) var(--sp-4)',
  gap: 10,

  background: cssVarV2('layer/background/secondary'),
  selectors: {
    '&.dense': {
      background: cssVarV2('layer/background/mobile/primary'),
    },
  },
});
export const floatActionsOnly = style({
  justifyContent: 'flex-end',
});
export const floatWsSelector = style({
  width: 0,
  flex: 1,
  visibility: 'hidden',
  pointerEvents: 'none',
  selectors: {
    [`${float}.dense &`]: {
      visibility: 'visible',
      pointerEvents: 'auto',
    },
  },
});
