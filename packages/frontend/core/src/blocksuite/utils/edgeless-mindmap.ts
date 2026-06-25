import { MindmapElementModel } from '@blocksuite/affine/model';
import type { GfxModel } from '@blocksuite/affine/std/gfx';

export function isMindMapRoot(ele: GfxModel) {
  const group = ele?.group;

  return group instanceof MindmapElementModel && group.tree.element === ele;
}

export function isMindmapChild(ele: GfxModel) {
  return ele?.group instanceof MindmapElementModel && !isMindMapRoot(ele);
}
