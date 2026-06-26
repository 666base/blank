import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';

import { effects } from './effects';
import { FootNoteInlineSpecExtension } from './inline-spec';

export class FootnoteViewExtension extends ViewExtensionProvider {
  override name = 'blank-footnote-inline';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register(FootNoteInlineSpecExtension);
  }
}
