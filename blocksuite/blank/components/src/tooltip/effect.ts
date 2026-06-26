import { Tooltip } from './tooltip.js';

export function effects() {
  if (!customElements.get('blank-tooltip')) {
    customElements.define('blank-tooltip', Tooltip);
  }
}
