import { BLANK_SLASH_MENU_WIDGET } from './consts';
import { InnerSlashMenu, SlashMenu } from './slash-menu-popover';
import { BlankSlashMenuWidget } from './widget';

export function effects() {
  customElements.define(BLANK_SLASH_MENU_WIDGET, BlankSlashMenuWidget);
  customElements.define('blank-slash-menu', SlashMenu);
  customElements.define('inner-slash-menu', InnerSlashMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    [BLANK_SLASH_MENU_WIDGET]: BlankSlashMenuWidget;
  }
}
