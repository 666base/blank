// corresponding to `formatText` command
import { TableModelFlavour } from '@blocksuite/blank-model';

export const FORMAT_TEXT_SUPPORT_FLAVOURS = [
  'blank:paragraph',
  'blank:list',
  'blank:code',
];
// corresponding to `formatBlock` command
export const FORMAT_BLOCK_SUPPORT_FLAVOURS = [
  'blank:paragraph',
  'blank:list',
  'blank:code',
];
// corresponding to `formatNative` command
export const FORMAT_NATIVE_SUPPORT_FLAVOURS = [
  'blank:database',
  TableModelFlavour,
];
