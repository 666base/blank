import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

import { PICKER_BOTTOM_INSET } from './constants';

export const root = style({
  width: '100%',
  borderBottom: `1px solid ${cssVarV2('layer/insideBorder/border')}`,
  overflow: 'hidden',
  transition: 'height 0.25s ease',
  paddingBottom: `${PICKER_BOTTOM_INSET}px`,
});

export const weekRow = style({
  padding: '0 16px',
});

export const body = style({
  transition: 'height 0.25s ease',
  overflow: 'hidden',
});
