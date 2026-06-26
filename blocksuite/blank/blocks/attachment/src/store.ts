import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { AttachmentBlockSchemaExtension } from '@blocksuite/blank-model';

import { AttachmentBlockAdapterExtensions } from './adapters/extension';

export class AttachmentStoreExtension extends StoreExtensionProvider {
  override name = 'blank-attachment-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(AttachmentBlockSchemaExtension);
    context.register(AttachmentBlockAdapterExtensions);
  }
}
