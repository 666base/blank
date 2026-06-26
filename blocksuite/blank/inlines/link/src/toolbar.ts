import { ToolbarModuleExtension } from '@blocksuite/blank-shared/services';
import { BlockFlavourIdentifier } from '@blocksuite/std';

import { builtinInlineLinkToolbarConfig } from './link-node/configs/toolbar.js';

export const linkToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('blank:link'),
  config: builtinInlineLinkToolbarConfig,
});
