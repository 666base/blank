import { type FrameBlockModel } from '@blocksuite/blank-model';
import { WidgetComponent, WidgetViewExtension } from '@blocksuite/std';
import { html } from 'lit';
import { literal, unsafeStatic } from 'lit/static-html.js';

export const BLANK_FRAME_TITLE_WIDGET = 'blank-frame-title-widget';

export class BlankFrameTitleWidget extends WidgetComponent<FrameBlockModel> {
  override render() {
    return html`<blank-frame-title
      .model=${this.model}
      data-id=${this.model.id}
    ></blank-frame-title>`;
  }
}

export const frameTitleWidget = WidgetViewExtension(
  'blank:frame',
  BLANK_FRAME_TITLE_WIDGET,
  literal`${unsafeStatic(BLANK_FRAME_TITLE_WIDGET)}`
);
