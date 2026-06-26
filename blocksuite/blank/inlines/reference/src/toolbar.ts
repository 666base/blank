import { ToolbarModuleExtension } from '@blocksuite/blank-shared/services';
import { BlockFlavourIdentifier } from '@blocksuite/std';

import { builtinInlineReferenceToolbarConfig } from './reference-node/configs/toolbar';

export const referenceNodeToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('blank:reference'),
  config: builtinInlineReferenceToolbarConfig,
});
