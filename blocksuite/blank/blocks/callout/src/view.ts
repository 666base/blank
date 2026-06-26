import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { SlashMenuConfigExtension } from '@blocksuite/blank-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { CalloutKeymapExtension } from './callout-keymap';
import { calloutSlashMenuConfig } from './configs/slash-menu';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { effects } from './effects';

export class CalloutViewExtension extends ViewExtensionProvider {
  override name = 'blank-callout-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('blank:callout'),
      BlockViewExtension('blank:callout', literal`blank-callout`),
      CalloutKeymapExtension,
      SlashMenuConfigExtension('blank:callout', calloutSlashMenuConfig),
      ...createBuiltinToolbarConfigExtension('blank:callout'),
    ]);
  }
}
