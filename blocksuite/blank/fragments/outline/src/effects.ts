import { BLANK_OUTLINE_NOTICE, OutlineNotice } from './body/outline-notice';
import {
  BLANK_OUTLINE_PANEL_BODY,
  OutlinePanelBody,
} from './body/outline-panel-body';
import { BLANK_OUTLINE_NOTE_CARD, OutlineNoteCard } from './card/outline-card';
import {
  BLANK_OUTLINE_BLOCK_PREVIEW,
  OutlineBlockPreview,
} from './card/outline-preview';
import {
  BLANK_OUTLINE_PANEL_HEADER,
  OutlinePanelHeader,
} from './header/outline-panel-header';
import {
  BLANK_OUTLINE_NOTE_PREVIEW_SETTING_MENU,
  OutlineNotePreviewSettingMenu,
} from './header/outline-setting-menu';
import {
  BLANK_MOBILE_OUTLINE_MENU,
  MobileOutlineMenu,
} from './mobile-outline-panel';
import { BLANK_OUTLINE_PANEL, OutlinePanel } from './outline-panel';
import { BLANK_OUTLINE_VIEWER, OutlineViewer } from './outline-viewer';

export function effects() {
  customElements.define(
    BLANK_OUTLINE_NOTE_PREVIEW_SETTING_MENU,
    OutlineNotePreviewSettingMenu
  );
  customElements.define(BLANK_OUTLINE_NOTICE, OutlineNotice);
  customElements.define(BLANK_OUTLINE_PANEL, OutlinePanel);
  customElements.define(BLANK_OUTLINE_PANEL_HEADER, OutlinePanelHeader);
  customElements.define(BLANK_OUTLINE_NOTE_CARD, OutlineNoteCard);
  customElements.define(BLANK_OUTLINE_VIEWER, OutlineViewer);
  customElements.define(BLANK_MOBILE_OUTLINE_MENU, MobileOutlineMenu);
  customElements.define(BLANK_OUTLINE_BLOCK_PREVIEW, OutlineBlockPreview);
  customElements.define(BLANK_OUTLINE_PANEL_BODY, OutlinePanelBody);
}
