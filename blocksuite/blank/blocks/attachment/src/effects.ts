import { AttachmentBlockComponent } from './attachment-block';
import { AttachmentEdgelessBlockComponent } from './attachment-edgeless-block';

export function effects() {
  customElements.define(
    'blank-edgeless-attachment',
    AttachmentEdgelessBlockComponent
  );
  customElements.define('blank-attachment', AttachmentBlockComponent);
}
