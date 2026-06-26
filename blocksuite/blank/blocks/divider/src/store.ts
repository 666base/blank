import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { DividerBlockSchemaExtension } from '@blocksuite/blank-model';

import { DividerBlockAdapterExtensions } from './adapters/extension';

export class DividerStoreExtension extends StoreExtensionProvider {
  override name = 'blank-divider-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(DividerBlockSchemaExtension);
    context.register(DividerBlockAdapterExtensions);
  }
}
