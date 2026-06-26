import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

const mobileBg = cssVarV2('layer/background/mobile/primary');

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
  overflow: 'hidden',
  backgroundColor: mobileBg,
});

export const header = style({
  backgroundColor: mobileBg,
});

export const headerTitle = style({
  color: cssVarV2('text/primary'),
  fontSize: 17,
  lineHeight: '22px',
  fontWeight: 600,
  letterSpacing: -0.43,
});

export const journalDatePicker = style({
  backgroundColor: mobileBg,
});
