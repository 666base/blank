import {
  BLANK_SCROLL_ANCHORING_WIDGET,
  BlankScrollAnchoringWidget,
} from './scroll-anchoring.js';

export function effects() {
  customElements.define(
    BLANK_SCROLL_ANCHORING_WIDGET,
    BlankScrollAnchoringWidget
  );
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_SCROLL_ANCHORING_WIDGET]: BlankScrollAnchoringWidget;
  }
}
