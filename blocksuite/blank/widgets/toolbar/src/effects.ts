import { BLANK_TOOLBAR_WIDGET, BlankToolbarWidget } from './toolbar';

export function effects() {
  customElements.define(BLANK_TOOLBAR_WIDGET, BlankToolbarWidget);
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_TOOLBAR_WIDGET]: BlankToolbarWidget;
  }
}
