import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { AttachmentBlockSchema } from '@blocksuite/blank-model';
import { SlashMenuConfigExtension } from '@blocksuite/blank-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { AttachmentBlockInteraction } from './attachment-edgeless-block.js';
import { AttachmentDropOption } from './attachment-service.js';
import { attachmentSlashMenuConfig } from './configs/slash-menu.js';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { EdgelessClipboardAttachmentConfig } from './edgeless-clipboard-config';
import { effects } from './effects.js';
import {
  AttachmentEmbedConfigExtension,
  AttachmentEmbedService,
} from './embed';

const flavour = AttachmentBlockSchema.model.flavour;

export class AttachmentViewExtension extends ViewExtensionProvider {
  override name = 'blank-attachment-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension(flavour),
      BlockViewExtension(flavour, model => {
        return model.parent?.flavour === 'blank:surface'
          ? literal`blank-edgeless-attachment`
          : literal`blank-attachment`;
      }),
      AttachmentDropOption,
      AttachmentEmbedConfigExtension(),
      AttachmentEmbedService,
      SlashMenuConfigExtension(flavour, attachmentSlashMenuConfig),
      ...createBuiltinToolbarConfigExtension(flavour),
    ]);
    if (this.isEdgeless(context.scope)) {
      context.register(EdgelessClipboardAttachmentConfig);
      context.register(AttachmentBlockInteraction);
    }
  }
}
