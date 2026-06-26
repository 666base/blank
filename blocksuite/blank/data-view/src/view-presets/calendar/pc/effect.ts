import { CalendarViewUI } from './view.js';

export function pcEffects() {
  if (customElements.get('blank-data-view-calendar')) {
    return;
  }
  customElements.define('blank-data-view-calendar', CalendarViewUI);
}
