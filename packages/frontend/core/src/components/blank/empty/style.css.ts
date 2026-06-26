import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--sp-4)',

  // SVG illustration has a space from top, add some padding bottom to compensate
  paddingBottom: 35,
});

export const illustration = style({
  maxWidth: '100%',
  width: 300,
});

export const title = style({
  textAlign: 'center',
  fontSize: 'var(--text-md)',
  lineHeight: 'var(--leading-md)',
  fontWeight: 'var(--weight-medium)',
  color: cssVarV2('text/primary'),
  marginBottom: 'var(--sp-1)',
});

export const description = style({
  textAlign: 'center',
  fontSize: 'var(--text-base)',
  fontWeight: 'var(--weight-regular)',
  lineHeight: 'var(--leading-base)',
  color: cssVarV2('text/secondary'),
  marginBottom: 0,
  maxWidth: 300,
});

export const absoluteCenter = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const actionGroup = style({
  display: 'flex',
  gap: 'var(--sp-4)',
});

export const actionButton = style({});
export const mobileActionButton = style({
  padding: 'var(--sp-2) 18px',
  height: 'auto',
  fontWeight: 'var(--weight-semibold)',
});

export const actionContent = style({
  padding: '0 4px',
});
export const mobileActionContent = style({
  padding: '0 4px',
});
