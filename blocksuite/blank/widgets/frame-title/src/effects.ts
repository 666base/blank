import {
  BLANK_FRAME_TITLE_WIDGET,
  BlankFrameTitleWidget,
} from './blank-frame-title-widget.js';
import { EdgelessFrameTitleEditor } from './edgeless-frame-title-editor.js';
import { BLANK_FRAME_TITLE, BlankFrameTitle } from './frame-title.js';

export function effects() {
  customElements.define(BLANK_FRAME_TITLE_WIDGET, BlankFrameTitleWidget);
  customElements.define(BLANK_FRAME_TITLE, BlankFrameTitle);
  customElements.define(
    'edgeless-frame-title-editor',
    EdgelessFrameTitleEditor
  );
}
