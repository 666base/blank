import { BlankLink } from './link-node/blank-link';
import { LinkPopup } from './link-node/link-popup/link-popup';

export function effects() {
  customElements.define('link-popup', LinkPopup);
  customElements.define('blank-link', BlankLink);
}
