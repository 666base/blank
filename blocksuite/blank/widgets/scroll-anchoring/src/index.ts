import { WidgetViewExtension } from '@blocksuite/std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { BLANK_SCROLL_ANCHORING_WIDGET } from './scroll-anchoring.js';

export * from './scroll-anchoring.js';

export const scrollAnchoringWidget = WidgetViewExtension(
  'blank:page',
  BLANK_SCROLL_ANCHORING_WIDGET,
  literal`${unsafeStatic(BLANK_SCROLL_ANCHORING_WIDGET)}`
);
