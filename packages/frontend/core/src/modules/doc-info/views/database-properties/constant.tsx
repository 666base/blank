import type { I18nString } from '@blank/i18n';
import {
  CheckBoxCheckLinearIcon,
  DateTimeIcon,
  LinkIcon,
  MultiSelectIcon,
  NumberIcon,
  ProgressIcon,
  SingleSelectIcon,
  TextIcon,
} from '@blocksuite/icons/rc';

import type { DatabaseCellRendererProps } from '../../types';
import { CheckboxCell } from './cells/checkbox';
import { DateCell } from './cells/date';
import { LinkCell } from './cells/link';
import { NumberCell } from './cells/number';
import { ProgressCell } from './cells/progress';
import { RichTextCell } from './cells/rich-text';
import { MultiSelectCell, SelectCell } from './cells/select';

export const DatabaseRendererTypes = {
  'rich-text': {
    Icon: TextIcon,
    Renderer: RichTextCell,
    name: 'com.blank.page-properties.property.text',
  },
  checkbox: {
    Icon: CheckBoxCheckLinearIcon,
    Renderer: CheckboxCell,
    name: 'com.blank.page-properties.property.checkbox',
  },
  date: {
    Icon: DateTimeIcon,
    Renderer: DateCell,
    name: 'com.blank.page-properties.property.date',
  },
  number: {
    Icon: NumberIcon,
    Renderer: NumberCell,
    name: 'com.blank.page-properties.property.number',
  },
  link: {
    Icon: LinkIcon,
    Renderer: LinkCell,
    name: 'com.blank.page-properties.property.link',
  },
  progress: {
    Icon: ProgressIcon,
    Renderer: ProgressCell,
    name: 'com.blank.page-properties.property.progress',
  },
  select: {
    Icon: SingleSelectIcon,
    Renderer: SelectCell,
    name: 'com.blank.page-properties.property.select',
  },
  'multi-select': {
    Icon: MultiSelectIcon,
    Renderer: MultiSelectCell,
    name: 'com.blank.page-properties.property.multi-select',
  },
} as Record<
  string,
  {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    Renderer: React.FC<DatabaseCellRendererProps>;
    name: I18nString;
  }
>;

export const isSupportedDatabaseRendererType = (type?: string): boolean => {
  return type ? type in DatabaseRendererTypes : false;
};
