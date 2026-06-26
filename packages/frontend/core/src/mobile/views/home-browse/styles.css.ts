import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const tabsRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '4px 16px 12px',
  flexWrap: 'wrap',
});

export const tab = style({
  fontSize: 15,
  fontWeight: 600,
  lineHeight: '22px',
  padding: '6px 12px',
  borderRadius: 999,
  color: cssVarV2('text/secondary'),
  backgroundColor: 'transparent',
  textDecoration: 'none',
  selectors: {
    '&[data-active="true"]': {
      color: cssVarV2('text/primary'),
      backgroundColor: cssVarV2('layer/background/hoverOverlay'),
    },
  },
});

export const tabContent = style({
  padding: '0 8px',
  paddingBottom: 'calc(var(--affine-app-tab-safe-area, 72px) + 16px)',
  minHeight: 280,
});

export const emptyState = style({
  position: 'relative',
  minHeight: 240,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
