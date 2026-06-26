import { bodyRegular } from '@toeverything/theme/typography';
import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const themeBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '4px 8px 12px',
});

export const themeLabel = style([
  bodyRegular,
  {
    color: cssVarV2('text/primary'),
  },
]);

export const themePicker = style({
  width: '100%',
});
