import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';

import { effects } from './effects';
import { viewportOverlayWidget } from './index';

export class ViewportOverlayViewExtension extends ViewExtensionProvider {
  override name = 'blank-viewport-overlay-widget';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register(viewportOverlayWidget);
  }
}
