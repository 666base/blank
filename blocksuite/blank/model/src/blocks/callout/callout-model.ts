import type { IconData } from '@blocksuite/blank-shared/services';
import {
  BlockModel,
  BlockSchemaExtension,
  defineBlockSchema,
  type Text,
} from '@blocksuite/store';

import type { BlockMeta } from '../../utils/types';

export type CalloutProps = {
  icon?: IconData;
  text: Text;
  backgroundColorName?: string;
} & BlockMeta;

export const CalloutBlockSchema = defineBlockSchema({
  flavour: 'blank:callout',
  props: (internal): CalloutProps => ({
    icon: { type: 'emoji', unicode: '💡' } as IconData,
    text: internal.Text(),
    backgroundColorName: 'grey',
    'meta:createdAt': undefined,
    'meta:updatedAt': undefined,
    'meta:createdBy': undefined,
    'meta:updatedBy': undefined,
  }),
  metadata: {
    version: 1,
    role: 'hub',
    parent: [
      'blank:note',
      'blank:database',
      'blank:paragraph',
      'blank:list',
      'blank:edgeless-text',
      'blank:transcription',
    ],
    children: ['blank:paragraph', 'blank:list'],
  },
  toModel: () => new CalloutBlockModel(),
});

export class CalloutBlockModel extends BlockModel<CalloutProps> {}

export const CalloutBlockSchemaExtension =
  BlockSchemaExtension(CalloutBlockSchema);
