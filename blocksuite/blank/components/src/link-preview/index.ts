import { LinkPreview } from './link';

export * from './link';

export function effects() {
  customElements.define('blank-link-preview', LinkPreview);
}
