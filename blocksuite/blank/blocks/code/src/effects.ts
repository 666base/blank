import { CodeBlockComponent } from './code-block';
import {
  BLANK_CODE_TOOLBAR_WIDGET,
  BlankCodeToolbarWidget,
} from './code-toolbar';
import { BlankCodeToolbar } from './code-toolbar/components/code-toolbar';
import { LanguageListButton } from './code-toolbar/components/lang-button';
import { BlankCodeMoreMenu } from './code-toolbar/components/more-menu';
import { PreviewButton } from './code-toolbar/components/preview-button';
import { BlankCodeUnit } from './highlight/blank-code-unit';

export function effects() {
  customElements.define('language-list-button', LanguageListButton);
  customElements.define('blank-code-toolbar', BlankCodeToolbar);
  customElements.define('blank-code-more-menu', BlankCodeMoreMenu);
  customElements.define(BLANK_CODE_TOOLBAR_WIDGET, BlankCodeToolbarWidget);
  customElements.define('blank-code-unit', BlankCodeUnit);
  customElements.define('blank-code', CodeBlockComponent);
  customElements.define('preview-button', PreviewButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'language-list-button': LanguageListButton;
    'blank-code-toolbar': BlankCodeToolbar;
    'blank-code-more-menu': BlankCodeMoreMenu;
    'preview-button': PreviewButton;
    [BLANK_CODE_TOOLBAR_WIDGET]: BlankCodeToolbarWidget;
  }
}
