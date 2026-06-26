import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

import { patchIconPickerService } from './icon-picker-service';

const optionsSchema = z.object({
  framework: z.instanceof(FrameworkProvider).optional(),
});

type BlankIconPickerViewOptions = z.infer<typeof optionsSchema>;

export class BlankIconPickerExtension extends ViewExtensionProvider<BlankIconPickerViewOptions> {
  override name = 'blank-icon-picker-extension';

  override schema = optionsSchema;

  override setup(
    context: ViewExtensionContext,
    options?: BlankIconPickerViewOptions
  ) {
    super.setup(context, options);
    if (!options?.framework) {
      return;
    }
    const { framework } = options;
    context.register(patchIconPickerService(framework));
  }
}
