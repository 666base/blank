import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const badge = style({
  backgroundColor: cssVarV2('button/primary'),
  color: cssVarV2('text/pureWhite'),
  minWidth: '16px',
  height: '16px',
  padding: '0px 4px',
  borderRadius: '4px',
  fontSize: '12px',
  textAlign: 'center',
  lineHeight: '16px',
  fontWeight: 500,
});

export const iconBadge = style([
  badge,
  {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: '16px',
    padding: 0,
    borderRadius: '50%',
    fontSize: '10px',
  },
]);

export const iconTrigger = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: 4,
  lineHeight: 0,
  cursor: 'pointer',
  selectors: {
    '&[data-active="true"]': {
      background: cssVarV2('layer/background/hoverOverlay'),
    },
    '&:hover': {
      background: cssVarV2('layer/background/hoverOverlay'),
    },
  },
});
