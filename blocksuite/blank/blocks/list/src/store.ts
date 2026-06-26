import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { ListBlockSchemaExtension } from '@blocksuite/blank-model';

import { ListBlockAdapterExtensions } from './adapters/extension';

export class ListStoreExtension extends StoreExtensionProvider {
  override name = 'blank-list-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(ListBlockSchemaExtension);
    context.register(ListBlockAdapterExtensions);
  }
}
