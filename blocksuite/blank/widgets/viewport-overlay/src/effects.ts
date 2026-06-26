import {
  BLANK_VIEWPORT_OVERLAY_WIDGET,
  BlankViewportOverlayWidget,
} from './index';

export function effects() {
  customElements.define(
    BLANK_VIEWPORT_OVERLAY_WIDGET,
    BlankViewportOverlayWidget
  );
}
