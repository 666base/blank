import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const mobileRouteFallback = style({
  minHeight: '100dvh',
  backgroundColor: cssVarV2('layer/background/mobile/primary'),
});
