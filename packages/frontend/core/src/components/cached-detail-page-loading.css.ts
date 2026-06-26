import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { keyframes, style } from '@vanilla-extract/css';

const skeletonPulse = keyframes({
  '0%, 100%': { opacity: 0.45 },
  '50%': { opacity: 0.9 },
});

export const cachedContainer = style({
  flex: 1,
  minHeight: 0,
  overflow: 'auto',
  padding: '48px 72px 32px',
  background: cssVar('backgroundPrimaryColor'),
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '24px 20px 16px',
      background: cssVarV2('layer/background/mobile/primary'),
    },
  },
});

export const cachedTitle = style({
  margin: 0,
  fontSize: cssVar('fontH1'),
  fontWeight: 700,
  lineHeight: 1.3,
  color: cssVarV2('text/primary'),
  wordBreak: 'break-word',
});

export const cachedPreview = style({
  margin: '16px 0 0',
  fontSize: cssVar('fontBase'),
  lineHeight: 1.7,
  color: cssVarV2('text/secondary'),
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

const skeletonBase = {
  background: cssVarV2('layer/background/hoverOverlay'),
  borderRadius: 6,
  animation: `${skeletonPulse} 1.4s ease-in-out infinite`,
} as const;

export const skeletonTitle = style({
  ...skeletonBase,
  height: 36,
  width: '55%',
  maxWidth: 420,
  marginBottom: 24,
});

export const skeletonLine = style({
  ...skeletonBase,
  height: 14,
  width: '100%',
  marginBottom: 12,
});

export const skeletonLineShort = style({
  ...skeletonBase,
  height: 14,
  width: '72%',
});
