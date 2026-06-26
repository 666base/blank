import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';

import { patchDatabaseBlockConfigService } from './database-block-config-service';

const optionsSchema = z.object({
  framework: z.instanceof(FrameworkProvider).optional(),
});

export type BlankDatabaseViewOptions = z.infer<typeof optionsSchema>;

export class BlankDatabaseViewExtension extends ViewExtensionProvider<BlankDatabaseViewOptions> {
  override name = 'blank-database-view';

  override schema = optionsSchema;

  override setup(
    context: ViewExtensionContext,
    options?: BlankDatabaseViewOptions
  ) {
    super.setup(context, options);

    context.register(patchDatabaseBlockConfigService(options?.framework));
  }
}
