import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { EdgelessTextBlockSchemaExtension } from '@blocksuite/blank-model';

export class EdgelessTextStoreExtension extends StoreExtensionProvider {
  override name = 'blank-edgeless-text-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(EdgelessTextBlockSchemaExtension);
  }
}
