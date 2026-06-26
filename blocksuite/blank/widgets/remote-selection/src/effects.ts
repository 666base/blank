import { BLANK_DOC_REMOTE_SELECTION_WIDGET } from './doc';
import { BlankDocRemoteSelectionWidget } from './doc/doc-remote-selection';
import {
  BLANK_EDGELESS_REMOTE_SELECTION_WIDGET,
  EdgelessRemoteSelectionWidget,
} from './edgeless';

export function effects() {
  customElements.define(
    BLANK_DOC_REMOTE_SELECTION_WIDGET,
    BlankDocRemoteSelectionWidget
  );
  customElements.define(
    BLANK_EDGELESS_REMOTE_SELECTION_WIDGET,
    EdgelessRemoteSelectionWidget
  );
}
