import {
  bodyEmphasized,
  footnoteRegular,
} from '@toeverything/theme/typography';
import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const card = style({
  padding: 'var(--sp-4)',
  borderRadius: 'var(--radius-lg)',
  border: `0.5px solid var(--border-faint)`,
  boxShadow: 'var(--shadow-xs)',
  background: cssVarV2('layer/background/mobile/secondary'),

  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--sp-2)',

  color: 'unset',
  ':visited': { color: 'unset' },
  ':hover': { color: 'unset' },
  ':active': { color: 'unset' },
});
export const head = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
});
export const title = style([
  bodyEmphasized,
  {
    width: 0,
    flex: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
]);
export const untitled = style({
  opacity: 0.4,
});
export const content = style([
  footnoteRegular,
  {
    overflow: 'hidden',
  },
]);

export const contentEmpty = style({
  opacity: 0.3,
});
