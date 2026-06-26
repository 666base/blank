import { createEmbedBlockHtmlAdapterMatcher } from '@blocksuite/blank-block-embed';
import { BookmarkBlockSchema } from '@blocksuite/blank-model';
import { BlockHtmlAdapterExtension } from '@blocksuite/blank-shared/adapters';

export const bookmarkBlockHtmlAdapterMatcher =
  createEmbedBlockHtmlAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  bookmarkBlockHtmlAdapterMatcher
);
