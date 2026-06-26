import { ImageLayoutPainterExtension } from '@blocksuite/blank-block-image/turbo-painter';
import { ListLayoutPainterExtension } from '@blocksuite/blank-block-list/turbo-painter';
import { NoteLayoutPainterExtension } from '@blocksuite/blank-block-note/turbo-painter';
import { ParagraphLayoutPainterExtension } from '@blocksuite/blank-block-paragraph/turbo-painter';
import { ViewportLayoutPainter } from '@blocksuite/blank-gfx-turbo-renderer/painter';

new ViewportLayoutPainter([
  ParagraphLayoutPainterExtension,
  ListLayoutPainterExtension,
  NoteLayoutPainterExtension,
  ImageLayoutPainterExtension,
]);
