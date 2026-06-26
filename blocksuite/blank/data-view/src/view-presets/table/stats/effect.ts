import { DataBaseColumnStats } from './column-stats-bar.js';
import { DatabaseColumnStatsCell } from './column-stats-column.js';

export function statsEffects() {
  customElements.define('blank-database-column-stats', DataBaseColumnStats);
  customElements.define(
    'blank-database-column-stats-cell',
    DatabaseColumnStatsCell
  );
}
