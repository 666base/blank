import {
  BLANK_KEYBOARD_TOOLBAR_WIDGET,
  BlankKeyboardToolbarWidget,
} from './index.js';
import {
  BLANK_KEYBOARD_TOOL_PANEL,
  BlankKeyboardToolPanel,
} from './keyboard-tool-panel.js';
import {
  BLANK_KEYBOARD_TOOLBAR,
  BlankKeyboardToolbar,
} from './keyboard-toolbar.js';

export function effects() {
  customElements.define(
    BLANK_KEYBOARD_TOOLBAR_WIDGET,
    BlankKeyboardToolbarWidget
  );
  customElements.define(BLANK_KEYBOARD_TOOLBAR, BlankKeyboardToolbar);
  customElements.define(BLANK_KEYBOARD_TOOL_PANEL, BlankKeyboardToolPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_KEYBOARD_TOOLBAR]: BlankKeyboardToolbar;
    [BLANK_KEYBOARD_TOOL_PANEL]: BlankKeyboardToolPanel;
  }
}
