import { style } from '@vanilla-extract/css';

export const iconContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
});

export const switcher = style({
  ['WebkitAppRegion' as string]: 'no-drag',
});
