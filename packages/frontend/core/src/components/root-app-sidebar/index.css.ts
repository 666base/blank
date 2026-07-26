import { style } from '@vanilla-extract/css';

export const notesHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '0 2px 8px',
  borderBottom: '1px solid var(--blank-border, rgba(28,25,23,0.08))',
  marginBottom: 4,
});

export const notesHeaderTitle = style({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '24px',
  color: 'var(--blank-text, #1c1917)',
  padding: '0 6px',
});

export const workspaceAndUserWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  width: 'calc(100% + 12px)',
  height: 42,
  paddingRight: 6,
  alignSelf: 'center',
});

export const quickSearchAndNewPage = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '4px 0',
  marginLeft: -8,
  marginRight: -6,
});

export const quickSearch = style({
  width: 0,
  flex: 1,
});

export const workspaceWrapper = style({
  width: '100%',
  minWidth: 0,
});

export const bottomContainer = style({
  gap: 4,
  borderTop: '1px solid var(--blank-border, rgba(28,25,23,0.08))',
  paddingTop: 8,
});
