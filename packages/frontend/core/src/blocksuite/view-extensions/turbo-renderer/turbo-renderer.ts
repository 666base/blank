import { getWorkerUrl } from '@blank/env/worker';
import { CodeLayoutHandlerExtension } from '@blocksuite/blank/blocks/code';
import { ImageLayoutHandlerExtension } from '@blocksuite/blank/blocks/image';
import { ListLayoutHandlerExtension } from '@blocksuite/blank/blocks/list';
import { NoteLayoutHandlerExtension } from '@blocksuite/blank/blocks/note';
import { ParagraphLayoutHandlerExtension } from '@blocksuite/blank/blocks/paragraph';
import {
  TurboRendererConfigFactory,
  ViewportTurboRendererExtension,
} from '@blocksuite/blank/gfx/turbo-renderer';

function createPainterWorker() {
  const worker = new Worker(getWorkerUrl('turbo-painter'));
  return worker;
}

export const turboRendererExtension = [
  ParagraphLayoutHandlerExtension,
  ListLayoutHandlerExtension,
  NoteLayoutHandlerExtension,
  CodeLayoutHandlerExtension,
  ImageLayoutHandlerExtension,
  TurboRendererConfigFactory({
    options: {
      zoomThreshold: 1,
      debounceTime: 1000,
    },
    painterWorkerEntry: createPainterWorker,
  }),
  ViewportTurboRendererExtension,
];
