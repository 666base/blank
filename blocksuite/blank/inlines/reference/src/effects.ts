import { BlankReference, ReferencePopup } from './reference-node';

export function effects() {
  customElements.define('reference-popup', ReferencePopup);
  customElements.define('blank-reference', BlankReference);
}

declare global {
  interface HTMLElementTagNameMap {
    'blank-reference': BlankReference;
    'reference-popup': ReferencePopup;
  }
}
