import { ListBlockComponent } from './list-block.js';

export function effects() {
  customElements.define('blank-list', ListBlockComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-list': ListBlockComponent;
  }
}
