import { i18nTime } from '@blank/i18n';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext } from 'react';

import { JournalDatePickerContext } from './context';
import * as styles from './title.css';

export const JournalDatePickerTitle = ({
  className,
}: {
  className?: string;
}) => {
  const { selected, expanded, toggleExpanded } = useContext(
    JournalDatePickerContext
  );

  return (
    <button
      type="button"
      className={clsx(styles.root, className)}
      onClick={toggleExpanded}
      aria-expanded={expanded}
      aria-label={i18nTime(dayjs(selected), { absolute: { accuracy: 'month' } })}
      data-testid="journal-date-picker-toggle"
    >
      <span className={styles.label}>
        {i18nTime(dayjs(selected), { absolute: { accuracy: 'month' } })}
      </span>
      <ArrowDownSmallIcon
        className={clsx(styles.chevron, expanded && styles.chevronExpanded)}
      />
    </button>
  );
};
