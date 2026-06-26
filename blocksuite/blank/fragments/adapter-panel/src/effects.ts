import { AdapterPanel, BLANK_ADAPTER_PANEL } from './adapter-panel';
import {
  AdapterPanelBody,
  BLANK_ADAPTER_PANEL_BODY,
} from './body/adapter-panel-body';
import { AdapterMenu, BLANK_ADAPTER_MENU } from './header/adapter-menu';
import {
  AdapterPanelHeader,
  BLANK_ADAPTER_PANEL_HEADER,
} from './header/adapter-panel-header';

export function effects() {
  customElements.define(BLANK_ADAPTER_PANEL, AdapterPanel);
  customElements.define(BLANK_ADAPTER_MENU, AdapterMenu);
  customElements.define(BLANK_ADAPTER_PANEL_HEADER, AdapterPanelHeader);
  customElements.define(BLANK_ADAPTER_PANEL_BODY, AdapterPanelBody);
}
