import { createEmbedBlockPlainTextAdapterMatcher } from '@blocksuite/blank-block-embed';
import { BookmarkBlockSchema } from '@blocksuite/blank-model';
import { BlockPlainTextAdapterExtension } from '@blocksuite/blank-shared/adapters';

export const bookmarkBlockPlainTextAdapterMatcher =
  createEmbedBlockPlainTextAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(bookmarkBlockPlainTextAdapterMatcher);
