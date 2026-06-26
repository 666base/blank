import { StoreExtensionManager } from '@blocksuite/blank/ext-loader';
import { getInternalStoreExtensions } from '@blocksuite/blank/extensions/store';

const manager = new StoreExtensionManager(getInternalStoreExtensions());

export function getTestStoreManager() {
  return manager;
}
