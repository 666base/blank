import { ViewExtensionProvider } from '@blocksuite/blank-ext-loader';

import { effects } from './effects';

export class DocTitleViewExtension extends ViewExtensionProvider {
  override name = 'blank-doc-title-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
