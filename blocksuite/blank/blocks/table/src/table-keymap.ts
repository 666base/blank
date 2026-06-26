import { textKeymap } from '@blocksuite/blank-inline-preset';
import { TableBlockSchema } from '@blocksuite/blank-model';
import { KeymapExtension } from '@blocksuite/std';

export const TableKeymapExtension = KeymapExtension(textKeymap, {
  flavour: TableBlockSchema.model.flavour,
});
