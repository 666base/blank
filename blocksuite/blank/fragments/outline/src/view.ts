import { ViewExtensionProvider } from '@blocksuite/blank-ext-loader';

import { effects } from './effects';

export class OutlineViewExtension extends ViewExtensionProvider {
  override name = 'blank-outline-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
