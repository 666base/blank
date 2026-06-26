import { BlankText } from './nodes/blank-text';

export function effects() {
  customElements.define('blank-text', BlankText);
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-text': BlankText;
  }
}
