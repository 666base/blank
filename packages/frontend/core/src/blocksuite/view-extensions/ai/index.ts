import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

const optionsSchema = z.object({
  enable: z.boolean().optional(),
  framework: z.instanceof(FrameworkProvider).optional(),
});

type AIViewOptions = z.infer<typeof optionsSchema>;

/** Blank: AI editor extensions are disabled. */
export class AIViewExtension extends ViewExtensionProvider<AIViewOptions> {
  override name = 'blank-ai-view-extension';

  override schema = optionsSchema;

  override setup(_context: ViewExtensionContext, _options?: AIViewOptions) {
    // no-op
  }
}
