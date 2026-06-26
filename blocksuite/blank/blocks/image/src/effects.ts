import { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import { ImageBlockPageComponent } from './components/page-image-block.js';
import { ImageBlockComponent } from './image-block.js';
import { ImageEdgelessBlockComponent } from './image-edgeless-block.js';
import { ImageEdgelessPlaceholderBlockComponent } from './preview-image/edgeless.js';
import { ImagePlaceholderBlockComponent } from './preview-image/page.js';

export function effects() {
  customElements.define('blank-image', ImageBlockComponent);
  customElements.define('blank-edgeless-image', ImageEdgelessBlockComponent);
  customElements.define('blank-page-image', ImageBlockPageComponent);
  customElements.define('blank-image-fallback-card', ImageBlockFallbackCard);
  customElements.define(
    'blank-placeholder-preview-image',
    ImagePlaceholderBlockComponent
  );
  customElements.define(
    'blank-edgeless-placeholder-preview-image',
    ImageEdgelessPlaceholderBlockComponent
  );
}
