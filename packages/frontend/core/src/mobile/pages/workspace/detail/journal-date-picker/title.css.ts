import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 8px',
  margin: 0,
  border: 'none',
  borderRadius: 8,
  background: 'transparent',
  color: cssVarV2('text/primary'),
  cursor: 'pointer',
  maxWidth: '100%',
  pointerEvents: 'auto',
});

export const label = style({
  fontSize: 17,
  lineHeight: '22px',
  fontWeight: 600,
  letterSpacing: -0.43,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const chevron = style({
  flexShrink: 0,
  width: 20,
  height: 20,
  color: cssVarV2('icon/secondary'),
  transition: 'transform 0.25s ease',
});

export const chevronExpanded = style({
  transform: 'rotate(180deg)',
});
