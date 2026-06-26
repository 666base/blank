import { EmbedIframeBlockSchema } from '@blocksuite/blank-model';
import { SlashMenuConfigExtension } from '@blocksuite/blank-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import type { ExtensionType } from '@blocksuite/store';
import { literal } from 'lit/static-html.js';

import { embedIframeSlashMenuConfig } from './configs/slash-menu/slash-menu';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { EmbedIframeInteraction } from './embed-edgeless-iframe-block';

const flavour = EmbedIframeBlockSchema.model.flavour;

export const EmbedIframeViewExtensions: ExtensionType[] = [
  FlavourExtension(flavour),
  BlockViewExtension(flavour, model => {
    return model.parent?.flavour === 'blank:surface'
      ? literal`blank-embed-edgeless-iframe-block`
      : literal`blank-embed-iframe-block`;
  }),
  createBuiltinToolbarConfigExtension(flavour),
  SlashMenuConfigExtension(flavour, embedIframeSlashMenuConfig),
  EmbedIframeInteraction,
].flat();
