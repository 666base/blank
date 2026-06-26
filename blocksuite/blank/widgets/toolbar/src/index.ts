import { WidgetViewExtension } from '@blocksuite/std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { BLANK_TOOLBAR_WIDGET } from './toolbar';

export * from './toolbar';

export const toolbarWidget = WidgetViewExtension(
  'blank:page',
  BLANK_TOOLBAR_WIDGET,
  literal`${unsafeStatic(BLANK_TOOLBAR_WIDGET)}`
);
