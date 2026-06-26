import {
  DomElementRendererExtension,
  type DomRenderer,
} from '@blocksuite/blank-block-surface';
import type { HighlighterElementModel } from '@blocksuite/blank-model';
import { DefaultTheme } from '@blocksuite/blank-model';

import { renderBrushLikeDom } from './shared';

export const HighlighterDomRendererExtension = DomElementRendererExtension(
  'highlighter',
  (
    model: HighlighterElementModel,
    domElement: HTMLElement,
    renderer: DomRenderer
  ) => {
    renderBrushLikeDom({
      model,
      domElement,
      renderer,
      color: renderer.getColorValue(
        model.color,
        DefaultTheme.hightlighterColor,
        true
      ),
    });
  }
);
