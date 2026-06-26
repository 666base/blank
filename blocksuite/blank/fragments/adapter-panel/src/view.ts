import { ViewExtensionProvider } from '@blocksuite/blank-ext-loader';

import { effects } from './effects';

export class AdapterPanelViewExtension extends ViewExtensionProvider {
  override name = 'blank-adapter-panel-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
