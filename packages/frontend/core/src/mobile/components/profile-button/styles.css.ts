import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--touch-target)',
  height: 'var(--touch-target)',
  minWidth: 'var(--touch-target)',
  minHeight: 'var(--touch-target)',
  padding: 0,
  border: 'none',
  background: 'transparent',
  borderRadius: '50%',
  cursor: 'pointer',
  flexShrink: 0,
});

export const avatar = style({
  pointerEvents: 'none',
});

export const guestIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: '50%',
  overflow: 'hidden',
});
