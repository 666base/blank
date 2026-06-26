import { getPreviewThemeExtension } from '@blank/core/blocksuite/view-extensions/theme/preview-theme';
import { getThemeExtension } from '@blank/core/blocksuite/view-extensions/theme/theme';
import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

const optionsSchema = z.object({
  framework: z.instanceof(FrameworkProvider).optional(),
});

type BlankThemeViewOptions = z.infer<typeof optionsSchema>;

export class BlankThemeViewExtension extends ViewExtensionProvider<BlankThemeViewOptions> {
  override name = 'blank-view-theme';

  override schema = optionsSchema;

  override setup(
    context: ViewExtensionContext,
    options?: BlankThemeViewOptions
  ) {
    super.setup(context, options);
    const framework = options?.framework;
    if (!framework) {
      return;
    }

    if (this.isPreview(context.scope)) {
      context.register(getPreviewThemeExtension(framework));
    } else {
      context.register(getThemeExtension(framework));
    }
  }
}
