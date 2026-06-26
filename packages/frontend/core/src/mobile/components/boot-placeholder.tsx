/** Solid fill while workspace/workbench mounts — matches mobile boot shell. */
export const MobileBootPlaceholder = () => (
  <div
    style={{
      height: '100dvh',
      width: '100dvw',
      background: '#141414',
    }}
    aria-hidden
  />
);
