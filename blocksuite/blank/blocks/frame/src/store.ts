import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { FrameBlockSchemaExtension } from '@blocksuite/blank-model';

export class FrameStoreExtension extends StoreExtensionProvider {
  override name = 'blank-frame-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register([FrameBlockSchemaExtension]);
  }
}
