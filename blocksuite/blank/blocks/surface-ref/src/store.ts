import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { SurfaceRefBlockSchemaExtension } from '@blocksuite/blank-model';

export class SurfaceRefStoreExtension extends StoreExtensionProvider {
  override name = 'blank-surface-ref-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(SurfaceRefBlockSchemaExtension);
  }
}
