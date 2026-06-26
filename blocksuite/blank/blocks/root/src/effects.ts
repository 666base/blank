import {
  EdgelessRootBlockComponent,
  EdgelessRootPreviewBlockComponent,
  PageRootBlockComponent,
  PreviewRootBlockComponent,
} from './index.js';

export function effects() {
  // Register components by category
  registerRootComponents();
}

function registerRootComponents() {
  customElements.define('blank-page-root', PageRootBlockComponent);
  customElements.define('blank-preview-root', PreviewRootBlockComponent);
  customElements.define('blank-edgeless-root', EdgelessRootBlockComponent);
  customElements.define(
    'blank-edgeless-root-preview',
    EdgelessRootPreviewBlockComponent
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-edgeless-root': EdgelessRootBlockComponent;
    'blank-page-root': PageRootBlockComponent;
  }
}
