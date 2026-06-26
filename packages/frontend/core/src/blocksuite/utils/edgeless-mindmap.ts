import { MindmapElementModel } from '@blocksuite/blank/model';
import type { GfxModel } from '@blocksuite/blank/std/gfx';

export function isMindMapRoot(ele: GfxModel) {
  const group = ele?.group;

  return group instanceof MindmapElementModel && group.tree.element === ele;
}

export function isMindmapChild(ele: GfxModel) {
  return ele?.group instanceof MindmapElementModel && !isMindMapRoot(ele);
}
