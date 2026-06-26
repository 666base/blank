import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  margin: 0,
  padding: 0,
});

globalStyle('body', {
  color: 'var(--blank-text-primary-color)',
  fontFamily: 'var(--blank-font-family)',
  fontSize: 'var(--blank-font-base)',
  lineHeight: 'var(--blank-font-height)',
  backgroundColor: 'var(--blank-background-primary-color)',
});

globalStyle('.docs-story', {
  backgroundColor: 'var(--blank-background-primary-color)',
});

globalStyle('body.sb-main-fullscreen', {
  overflowY: 'auto',
});
