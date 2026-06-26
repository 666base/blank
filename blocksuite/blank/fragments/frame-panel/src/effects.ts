import {
  BLANK_FRAME_PANEL_BODY,
  FramePanelBody,
} from './body/frame-panel-body';
import { BLANK_FRAME_CARD, FrameCard } from './card/frame-card';
import {
  BLANK_FRAME_CARD_TITLE,
  FrameCardTitle,
} from './card/frame-card-title';
import {
  BLANK_FRAME_TITLE_EDITOR,
  FrameCardTitleEditor,
} from './card/frame-card-title-editor';
import { BLANK_FRAME_PREVIEW, FramePreview } from './card/frame-preview';
import { BLANK_FRAME_PANEL, FramePanel } from './frame-panel';
import {
  BLANK_FRAME_PANEL_HEADER,
  FramePanelHeader,
} from './header/frame-panel-header';
import {
  BLANK_FRAMES_SETTING_MENU,
  FramesSettingMenu,
} from './header/frames-setting-menu';

export function effects() {
  customElements.define(BLANK_FRAME_PANEL, FramePanel);
  customElements.define(BLANK_FRAME_TITLE_EDITOR, FrameCardTitleEditor);
  customElements.define(BLANK_FRAME_CARD, FrameCard);
  customElements.define(BLANK_FRAME_CARD_TITLE, FrameCardTitle);
  customElements.define(BLANK_FRAME_PANEL_BODY, FramePanelBody);
  customElements.define(BLANK_FRAME_PANEL_HEADER, FramePanelHeader);
  customElements.define(BLANK_FRAMES_SETTING_MENU, FramesSettingMenu);
  customElements.define(BLANK_FRAME_PREVIEW, FramePreview);
}
