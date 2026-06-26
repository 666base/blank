import {
  type HTMLAttributes,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  PageHeader,
  type PageHeaderProps,
} from '../../../../components/page-header';
import { getJournalPickerBottomSpacer } from './constants';
import { JournalDatePickerContext } from './context';
import { JournalDatePickerTitle } from './title';
import { ResizeViewport } from './viewport';

export interface JournalDatePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  date: string;
  onChange: (date: string) => void;
  withDotDates: Set<string | null | undefined>;
}

export const JournalDatePicker = ({
  date: selected,
  onChange,
  withDotDates,
  children,
  ...attrs
}: PropsWithChildren<JournalDatePickerProps>) => {
  const [cursor, setCursor] = useState(selected);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setCursor(selected);
  }, [selected]);

  useEffect(() => {
    setExpanded(false);
  }, [selected]);

  const toggleExpanded = useCallback(() => {
    setExpanded(current => !current);
  }, []);

  const onSelect = useCallback(
    (date: string) => {
      setCursor(date);
      onChange(date);
      setExpanded(false);
    },
    [onChange]
  );

  const width = window.innerWidth;
  const journalDatePickerContextValue = useMemo(
    () => ({
      selected,
      onSelect,
      cursor,
      setCursor,
      width,
      withDotDates,
      expanded,
      toggleExpanded,
    }),
    [
      cursor,
      expanded,
      onSelect,
      selected,
      toggleExpanded,
      width,
      withDotDates,
    ]
  );

  return (
    <JournalDatePickerContext.Provider value={journalDatePickerContextValue}>
      {children ?? <JournalDatePickerViewport {...attrs} />}
    </JournalDatePickerContext.Provider>
  );
};

export const JournalDatePickerViewport = ({
  className,
  ...attrs
}: HTMLAttributes<HTMLDivElement>) => {
  return <ResizeViewport className={className} {...attrs} />;
};

export type JournalPageHeaderProps = Omit<
  PageHeaderProps,
  'bottom' | 'bottomSpacer'
> &
  Pick<JournalDatePickerProps, 'date' | 'onChange' | 'withDotDates'> & {
    pickerClassName?: string;
  };

const JournalPageHeaderInner = ({
  pickerClassName,
  children,
  ...pageHeaderProps
}: Omit<JournalPageHeaderProps, 'date' | 'onChange' | 'withDotDates'>) => {
  const { expanded } = useContext(JournalDatePickerContext);

  return (
    <PageHeader
      {...pageHeaderProps}
      bottomSpacer={getJournalPickerBottomSpacer(expanded)}
      bottom={
        <JournalDatePickerViewport className={pickerClassName} />
      }
    >
      {children}
    </PageHeader>
  );
};

export const JournalPageHeader = ({
  date,
  onChange,
  withDotDates,
  pickerClassName,
  children,
  ...pageHeaderProps
}: JournalPageHeaderProps) => {
  return (
    <JournalDatePicker
      date={date}
      onChange={onChange}
      withDotDates={withDotDates}
    >
      <JournalPageHeaderInner
        pickerClassName={pickerClassName}
        {...pageHeaderProps}
      >
        {children ?? <JournalDatePickerTitle />}
      </JournalPageHeaderInner>
    </JournalDatePicker>
  );
};

export { JournalDatePickerTitle };

export function useJournalDatePicker() {
  return useContext(JournalDatePickerContext);
}
