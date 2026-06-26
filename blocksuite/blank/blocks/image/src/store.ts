import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { ImageBlockSchemaExtension } from '@blocksuite/blank-model';
import { ImageSelectionExtension } from '@blocksuite/blank-shared/selection';

import { ImageBlockAdapterExtensions } from './adapters/extension';

export class ImageStoreExtension extends StoreExtensionProvider {
  override name = 'blank-image-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([ImageBlockSchemaExtension, ImageSelectionExtension]);
    context.register(ImageBlockAdapterExtensions);
  }
}
