import type { EditorHost } from '@blocksuite/blank/std';

import {
  BLANK_AI_PANEL_WIDGET,
  BlankAIPanelWidget,
} from '../widgets/ai-panel/ai-panel';

export const getAIPanelWidget = (host: EditorHost): BlankAIPanelWidget => {
  const rootBlockId = host.store.root?.id;
  if (!rootBlockId) {
    throw new Error('rootBlockId is not found');
  }
  const aiPanel = host.view.getWidget(BLANK_AI_PANEL_WIDGET, rootBlockId);
  if (!(aiPanel instanceof BlankAIPanelWidget)) {
    throw new Error('AI panel not found');
  }
  return aiPanel;
};
