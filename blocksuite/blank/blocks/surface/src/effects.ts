import { SurfaceBlockComponent } from './surface-block.js';
import { SurfaceBlockVoidComponent } from './surface-block-void.js';

export function effects() {
  customElements.define('blank-surface-void', SurfaceBlockVoidComponent);
  customElements.define('blank-surface', SurfaceBlockComponent);
}
