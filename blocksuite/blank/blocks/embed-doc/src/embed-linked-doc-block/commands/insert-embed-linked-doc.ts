import { insertEmbedCard } from '@blocksuite/blank-block-embed';
import type { EmbedCardStyle, ReferenceParams } from '@blocksuite/blank-model';
import type { Command } from '@blocksuite/std';

export type LinkableFlavour =
  | 'blank:bookmark'
  | 'blank:embed-linked-doc'
  | 'blank:embed-synced-doc'
  | 'blank:embed-iframe'
  | 'blank:embed-figma'
  | 'blank:embed-github'
  | 'blank:embed-loom'
  | 'blank:embed-youtube';

export type InsertedLinkType = {
  flavour: LinkableFlavour;
} | null;

export const insertEmbedLinkedDocCommand: Command<
  {
    docId: string;
    params?: ReferenceParams;
  },
  { blockId: string }
> = (ctx, next) => {
  const { docId, params, std } = ctx;
  const flavour = 'blank:embed-linked-doc';
  const targetStyle: EmbedCardStyle = 'vertical';
  const props: Record<string, unknown> = { pageId: docId };
  if (params) props.params = params;
  const blockId = insertEmbedCard(std, { flavour, targetStyle, props });
  if (!blockId) return;
  next({ blockId });
};
