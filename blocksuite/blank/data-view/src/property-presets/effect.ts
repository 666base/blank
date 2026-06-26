import { CheckboxCell } from './checkbox/cell-renderer.js';
import { DateCell } from './date/cell-renderer.js';
import { ImageCell } from './image/cell-renderer.js';
import { MultiSelectCell } from './multi-select/cell-renderer.js';
import { NumberCell } from './number/cell-renderer.js';
import { ProgressCell } from './progress/cell-renderer.js';
import { SelectCell } from './select/cell-renderer.js';
import { TextCell } from './text/cell-renderer.js';

export function propertyPresetsEffects() {
  customElements.define('blank-database-checkbox-cell', CheckboxCell);
  customElements.define('blank-database-date-cell', DateCell);
  customElements.define('blank-database-image-cell', ImageCell);
  customElements.define('blank-database-multi-select-cell', MultiSelectCell);
  customElements.define('blank-database-number-cell', NumberCell);
  customElements.define('blank-database-progress-cell', ProgressCell);
  customElements.define('blank-database-select-cell', SelectCell);
  customElements.define('blank-database-text-cell', TextCell);
}
