import { HighlightDropdownMenu } from './dropdown-menu';
import { HighlightDuotoneIcon } from './highlight-duotone-icon';
import { TextDuotoneIcon } from './text-duotone-icon';

export * from './dropdown-menu';
export * from './highlight-duotone-icon';
export * from './text-duotone-icon';

export function effects() {
  customElements.define(
    'blank-highlight-dropdown-menu',
    HighlightDropdownMenu
  );
  customElements.define('blank-highlight-duotone-icon', HighlightDuotoneIcon);
  customElements.define('blank-text-duotone-icon', TextDuotoneIcon);
}
