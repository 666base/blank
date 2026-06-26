import { WidgetViewExtension } from '@blocksuite/std';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { BLANK_DOC_REMOTE_SELECTION_WIDGET } from './doc';
import { BLANK_EDGELESS_REMOTE_SELECTION_WIDGET } from './edgeless';

export * from './doc';
export * from './edgeless';

export const docRemoteSelectionWidget = WidgetViewExtension(
  'blank:page',
  BLANK_DOC_REMOTE_SELECTION_WIDGET,
  literal`${unsafeStatic(BLANK_DOC_REMOTE_SELECTION_WIDGET)}`
);

export const edgelessRemoteSelectionWidget = WidgetViewExtension(
  'blank:page',
  BLANK_EDGELESS_REMOTE_SELECTION_WIDGET,
  literal`${unsafeStatic(BLANK_EDGELESS_REMOTE_SELECTION_WIDGET)}`
);
