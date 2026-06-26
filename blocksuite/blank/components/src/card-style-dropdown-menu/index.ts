import { CardStyleDropdownMenu } from './dropdown-menu';

export * from './dropdown-menu';

export function effects() {
  customElements.define(
    'blank-card-style-dropdown-menu',
    CardStyleDropdownMenu
  );
}
