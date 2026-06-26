import { BlankMention } from './blank-mention';

export function effects() {
  customElements.define('blank-mention', BlankMention);
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-mention': BlankMention;
  }
}
