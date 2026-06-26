import { ViewExtensionManager } from '@blocksuite/blank/ext-loader';
import { getInternalViewExtensions } from '@blocksuite/blank/extensions/view';

const manager = new ViewExtensionManager(getInternalViewExtensions());

export function getTestViewManager() {
  return manager;
}
