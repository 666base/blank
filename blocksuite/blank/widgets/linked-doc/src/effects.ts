import { BLANK_LINKED_DOC_WIDGET } from './config.js';
import { ImportDoc } from './import-doc/import-doc.js';
import { Loader } from './import-doc/loader.js';
import { BlankLinkedDocWidget } from './index.js';
import { LinkedDocPopover } from './linked-doc-popover.js';
import { BlankMobileLinkedDocMenu } from './mobile-linked-doc-menu.js';

export function effects() {
  customElements.define('blank-linked-doc-popover', LinkedDocPopover);
  customElements.define(BLANK_LINKED_DOC_WIDGET, BlankLinkedDocWidget);
  customElements.define('import-doc', ImportDoc);
  customElements.define(
    'blank-mobile-linked-doc-menu',
    BlankMobileLinkedDocMenu
  );
  customElements.define('loader-element', Loader);
}
