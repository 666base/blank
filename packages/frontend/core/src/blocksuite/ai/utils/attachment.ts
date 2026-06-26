import { AttachmentBlockModel } from '@blocksuite/blank/model';
import type { BlockModel } from '@blocksuite/blank/store';
import type { GfxModel } from '@blocksuite/std/gfx';

export function isAttachment(
  model: GfxModel | BlockModel
): model is AttachmentBlockModel {
  return model instanceof AttachmentBlockModel;
}
