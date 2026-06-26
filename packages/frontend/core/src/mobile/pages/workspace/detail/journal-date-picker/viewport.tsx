import clsx from 'clsx';
import dayjs from 'dayjs';
import { type HTMLAttributes, useContext, useMemo } from 'react';

import {
  DATE_FORMAT,
  EXPANDED_PICKER_HEIGHT,
  MONTH_VIEW_HEIGHT,
  WEEK_VIEW_HEIGHT,
} from './constants';
import { JournalDatePickerContext } from './context';
import { MonthView } from './month';
import * as styles from './viewport.css';
import { WeekHeader, WeekRowSwipe } from './week';

export const ResizeViewport = ({
  className,
  ...attrs
}: HTMLAttributes<HTMLDivElement>) => {
  const { selected, expanded } = useContext(JournalDatePickerContext);

  const firstDayOfWeek = dayjs(selected).startOf('week').format(DATE_FORMAT);
  const bodyHeight = expanded ? MONTH_VIEW_HEIGHT : WEEK_VIEW_HEIGHT;

  const viewportStyle = useMemo(
    () => ({
      height: expanded ? EXPANDED_PICKER_HEIGHT : undefined,
    }),
    [expanded]
  );

  return (
    <div
      className={clsx(styles.root, className)}
      data-expanded={expanded ? '' : undefined}
      style={viewportStyle}
      {...attrs}
    >
      <WeekHeader className={styles.weekRow} />
      <div className={styles.body} style={{ height: bodyHeight }}>
        {expanded ? (
          <MonthView viewportHeight={bodyHeight} />
        ) : (
          <WeekRowSwipe start={firstDayOfWeek} />
        )}
      </div>
    </div>
  );
};
