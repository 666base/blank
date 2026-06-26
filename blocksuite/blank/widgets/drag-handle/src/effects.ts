import { BlankAddBlockWidget } from './components/add-block-widget';
import {
  EDGELESS_DND_PREVIEW_ELEMENT,
  EdgelessDndPreviewElement,
} from './components/edgeless-preview/preview';
import { BLANK_ADD_BLOCK_WIDGET, BLANK_DRAG_HANDLE_WIDGET } from './consts';
import { BlankDragHandleWidget } from './drag-handle';

export function effects() {
  customElements.define(BLANK_DRAG_HANDLE_WIDGET, BlankDragHandleWidget);
  customElements.define(BLANK_ADD_BLOCK_WIDGET, BlankAddBlockWidget);
  customElements.define(
    EDGELESS_DND_PREVIEW_ELEMENT,
    EdgelessDndPreviewElement
  );
}
