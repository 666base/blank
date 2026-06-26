import { ImageLayoutHandlerExtension } from '@blocksuite/blank/blocks/image';
import { ListLayoutHandlerExtension } from '@blocksuite/blank/blocks/list';
import { ParagraphLayoutHandlerExtension } from '@blocksuite/blank/blocks/paragraph';
import {
  TurboRendererConfigFactory,
  ViewportTurboRendererExtension,
  ViewportTurboRendererIdentifier,
} from '@blocksuite/blank/gfx/turbo-renderer';

import { addSampleNotes } from './doc-generator.js';
import { createPainterWorker, setupEditor } from './setup.js';

async function init() {
  await setupEditor('edgeless', [
    ParagraphLayoutHandlerExtension,
    ListLayoutHandlerExtension,
    ImageLayoutHandlerExtension,
    TurboRendererConfigFactory({
      painterWorkerEntry: createPainterWorker,
    }),
    ViewportTurboRendererExtension,
  ]);
  addSampleNotes(doc, 100);
  doc.load();

  const renderer = editor.std.get(
    ViewportTurboRendererIdentifier
  ) as ViewportTurboRendererExtension;
  window.renderer = renderer;
}

await init();
