export const CELL_HEIGHT = 34;
export const TOTAL_WEEKS = 6;
export const ROWS_GAP = 4;

export const MONTH_VIEW_HEIGHT =
  TOTAL_WEEKS * CELL_HEIGHT + (TOTAL_WEEKS - 1) * ROWS_GAP;
export const WEEK_VIEW_HEIGHT = CELL_HEIGHT;

/** Bottom breathing room where the old drag-handle strip used to sit. */
export const PICKER_BOTTOM_INSET = 10;

/** Week day labels + one swipeable week row. */
export const COLLAPSED_PICKER_HEIGHT =
  CELL_HEIGHT + WEEK_VIEW_HEIGHT + PICKER_BOTTOM_INSET;

/** Week day labels + full month grid. */
export const EXPANDED_PICKER_HEIGHT =
  CELL_HEIGHT + MONTH_VIEW_HEIGHT + PICKER_BOTTOM_INSET;

export function getJournalPickerBottomSpacer(expanded: boolean) {
  return expanded ? EXPANDED_PICKER_HEIGHT : COLLAPSED_PICKER_HEIGHT;
}

export const HORIZONTAL_SWIPE_THRESHOLD = 2 * CELL_HEIGHT;

export const DATE_FORMAT = 'YYYY-MM-DD';
