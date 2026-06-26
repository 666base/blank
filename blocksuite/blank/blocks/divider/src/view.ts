import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { BlockViewExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { effects } from './effects';
import { DividerMarkdownExtension } from './markdown';

export class DividerViewExtension extends ViewExtensionProvider {
  override name = 'blank-divider-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      BlockViewExtension('blank:divider', literal`blank-divider`),
      DividerMarkdownExtension,
    ]);
  }
}
