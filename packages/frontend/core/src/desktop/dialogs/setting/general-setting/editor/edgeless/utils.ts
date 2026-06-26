import type { FrameBlockModel } from '@blocksuite/blank/model';
import type { Store } from '@blocksuite/blank/store';

export function getFrameBlock(doc: Store) {
  const blocks = doc.getBlocksByFlavour('blank:frame');
  return blocks.length !== 0 ? (blocks[0].model as FrameBlockModel) : null;
}
