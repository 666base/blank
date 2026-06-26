import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

import { patchLinkPreviewService } from './link-preview-service';

const optionsSchema = z.object({
  framework: z.instanceof(FrameworkProvider).optional(),
});

type BlankLinkPreviewViewOptions = z.infer<typeof optionsSchema>;

export class BlankLinkPreviewExtension extends ViewExtensionProvider<BlankLinkPreviewViewOptions> {
  override name = 'blank-link-preview-extension';

  override schema = optionsSchema;

  override setup(
    context: ViewExtensionContext,
    options?: BlankLinkPreviewViewOptions
  ) {
    super.setup(context, options);
    if (!options?.framework) {
      return;
    }
    const { framework } = options;
    context.register(patchLinkPreviewService(framework));
  }
}
