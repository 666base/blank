import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/blank-ext-loader';
import { SurfaceRefBlockSchema } from '@blocksuite/blank-model';
import { ToolbarModuleExtension } from '@blocksuite/blank-shared/services';
import {
  BlockFlavourIdentifier,
  BlockViewExtension,
  FlavourExtension,
} from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { SurfaceRefSlashMenuConfigExtension } from './configs/slash-menu';
import { surfaceRefToolbarModuleConfig } from './configs/toolbar';
import { effects } from './effects';

const flavour = SurfaceRefBlockSchema.model.flavour;

export class SurfaceRefViewExtension extends ViewExtensionProvider {
  override name = 'blank-surface-ref-block';

  override effect(): void {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext): void {
    super.setup(context);
    context.register([
      FlavourExtension(flavour),
      SurfaceRefSlashMenuConfigExtension,
    ]);
    const isEdgeless = this.isEdgeless(context.scope);
    if (isEdgeless) {
      context.register([
        BlockViewExtension(flavour, literal`blank-edgeless-surface-ref`),
      ]);
    } else {
      context.register([
        BlockViewExtension(flavour, literal`blank-surface-ref`),
        ToolbarModuleExtension({
          id: BlockFlavourIdentifier(flavour),
          config: surfaceRefToolbarModuleConfig,
        }),
      ]);
    }
  }
}
