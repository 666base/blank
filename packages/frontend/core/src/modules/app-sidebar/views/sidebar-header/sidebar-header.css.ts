import { style } from '@vanilla-extract/css';

/** Empty strip matching scratch `h-11` Overlay drag region. */
export const dragStrip = style({
  justifyContent: 'flex-start',
  pointerEvents: 'auto',
});

export const macTrafficLightPad = style({
  // Keep macOS traffic lights clear of the strip content area
  minHeight: 'var(--blank-titlebar-height, 44px)',
});
