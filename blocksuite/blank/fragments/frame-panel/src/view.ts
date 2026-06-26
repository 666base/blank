import { ViewExtensionProvider } from '@blocksuite/blank-ext-loader';

import { effects } from './effects';

export class FramePanelViewExtension extends ViewExtensionProvider {
  override name = 'blank-frame-panel-fragment';

  override effect() {
    super.effect();
    effects();
  }
}
