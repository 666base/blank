import { AIChatBlockSchemaExtension } from '@blank/core/blocksuite/ai/blocks/ai-chat-block/model';
import { TranscriptionBlockSchemaExtension } from '@blank/core/blocksuite/ai/blocks/transcription-block/model';
import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/blank/ext-loader';

/** Schema-only: keeps existing docs readable without loading AI UI. */
export class AIStoreExtension extends StoreExtensionProvider {
  override name = 'blank-store-extensions';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(AIChatBlockSchemaExtension);
    context.register(TranscriptionBlockSchemaExtension);
  }
}
