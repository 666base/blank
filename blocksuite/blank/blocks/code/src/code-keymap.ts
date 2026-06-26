import { textKeymap } from '@blocksuite/blank-inline-preset';
import { CodeBlockSchema } from '@blocksuite/blank-model';
import { KeymapExtension } from '@blocksuite/std';

export const CodeKeymapExtension = KeymapExtension(textKeymap, {
  flavour: CodeBlockSchema.model.flavour,
});
