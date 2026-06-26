import {
  BLANK_PAGE_DRAGGING_AREA_WIDGET,
  BlankPageDraggingAreaWidget,
} from './index';

export function effects() {
  customElements.define(
    BLANK_PAGE_DRAGGING_AREA_WIDGET,
    BlankPageDraggingAreaWidget
  );
}
