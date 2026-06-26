import { SurfaceBlockSchema } from '@blocksuite/blank/blocks/surface';
import { BlockService } from '@blocksuite/blank/std';

export class MindmapSurfaceBlockService extends BlockService {
  static override readonly flavour = SurfaceBlockSchema.model.flavour;
}
