import type { ParagraphBlockModel } from '@blocksuite/blank-model';
import { ConfigExtensionFactory } from '@blocksuite/std';

export interface ParagraphBlockConfig {
  getPlaceholder: (model: ParagraphBlockModel) => string;
}

export const ParagraphBlockConfigExtension =
  ConfigExtensionFactory<ParagraphBlockConfig>('blank:paragraph');
