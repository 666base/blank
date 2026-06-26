import { cssVar } from '@toeverything/theme';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  color: cssVar('textPrimaryColor'),
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-base)',
  lineHeight: 'var(--leading-base)',
  backgroundColor: 'var(--bg-root)',
});

globalStyle('strong, b', {
  fontWeight: 'var(--weight-semibold)',
});
