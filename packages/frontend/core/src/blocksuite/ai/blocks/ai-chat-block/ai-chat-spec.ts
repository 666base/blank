import { BlockViewExtension } from '@blocksuite/blank/std';
import type { ExtensionType } from '@blocksuite/blank/store';
import { literal } from 'lit/static-html.js';

export const AIChatBlockSpec: ExtensionType[] = [
  BlockViewExtension('blank:embed-ai-chat', model => {
    const parent = model.store.getParent(model.id);

    if (parent?.flavour === 'blank:surface') {
      return literal`blank-edgeless-ai-chat`;
    }

    return literal`blank-ai-chat`;
  }),
];
