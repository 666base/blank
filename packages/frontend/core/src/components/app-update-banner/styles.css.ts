import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  width: '100%',
  flexShrink: 0,
  padding: '8px 12px',
  background: cssVarV2('layer/background/overlayPanel'),
  borderBottom: `0.5px solid ${cssVarV2('layer/insideBorder/border')}`,
  fontSize: cssVar('fontSm'),
  zIndex: 2,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  minWidth: 0,
  flex: 1,
});

export const title = style({
  color: cssVar('textPrimaryColor'),
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const progressTrack = style({
  width: '100%',
  maxWidth: 280,
  height: 4,
  borderRadius: 4,
  background: cssVar('black10'),
  overflow: 'hidden',
});

export const progressFill = style({
  height: '100%',
  borderRadius: 4,
  background: cssVar('primaryColor'),
  transition: 'width 0.15s ease',
});

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
});

export const percentLabel = style({
  color: cssVar('textSecondaryColor'),
  fontSize: cssVar('fontXs'),
  fontWeight: 600,
  minWidth: 40,
  textAlign: 'right',
});

export const dismiss = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  border: 'none',
  borderRadius: 6,
  background: 'transparent',
  color: cssVar('iconColor'),
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      background: cssVar('hoverColor'),
    },
  },
});
