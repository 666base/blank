import type { DocMode } from '@blocksuite/blank/model';

export const getDefaultShareMode = (
  currentMode?: DocMode
): DocMode | undefined => {
  return currentMode === 'edgeless' ? 'edgeless' : undefined;
};
