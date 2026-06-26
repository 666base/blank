import { cssVarV2 } from '@toeverything/theme/v2';
import { keyframes, style } from '@vanilla-extract/css';

const shimmer = keyframes({
  '0%': { opacity: 0.45 },
  '50%': { opacity: 0.9 },
  '100%': { opacity: 0.45 },
});

const mobileBg = cssVarV2('layer/background/mobile/primary');
const shimmerBg = cssVarV2('layer/background/hoverOverlay');

export const root = style({
  height: '100dvh',
  width: '100dvw',
  display: 'flex',
  flexDirection: 'column',
  background: mobileBg,
  overflow: 'hidden',
});

export const shimmerBlock = style({
  background: shimmerBg,
  borderRadius: 8,
  animation: `${shimmer} 1.2s ease-in-out infinite`,
});

export const topRow = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px 4px',
  minHeight: 'var(--touch-target, 44px)',
});

export const icon = style([
  shimmerBlock,
  {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
]);

export const tabsRow = style({
  display: 'flex',
  gap: 10,
  padding: '4px 16px 12px',
});

export const tab = style([
  shimmerBlock,
  {
    height: 34,
    width: 72,
    borderRadius: 999,
  },
]);

export const tabActive = style({
  width: 84,
  opacity: 0.75,
});

export const content = style({
  flex: 1,
  padding: '0 16px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const line = style([
  shimmerBlock,
  {
    height: 16,
    width: '100%',
  },
]);

export const lineLg = style({ width: '42%', height: 18 });
export const lineSm = style({ width: '58%' });

export const card = style([
  shimmerBlock,
  {
    height: 88,
    width: '100%',
    borderRadius: 12,
  },
]);

export const navbar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '13px 16px',
  borderTop: `0.5px solid ${cssVarV2('layer/insideBorder/border')}`,
});

export const navIcon = style([
  shimmerBlock,
  {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
]);

export const navIconActive = style({
  opacity: 0.75,
});
