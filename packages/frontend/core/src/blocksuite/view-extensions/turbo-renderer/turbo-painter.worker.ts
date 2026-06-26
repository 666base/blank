import { CodeLayoutPainterExtension } from '@blocksuite/blank/blocks/code';
import { ImageLayoutPainterExtension } from '@blocksuite/blank/blocks/image';
import { ListLayoutPainterExtension } from '@blocksuite/blank/blocks/list';
import { NoteLayoutPainterExtension } from '@blocksuite/blank/blocks/note';
import { ParagraphLayoutPainterExtension } from '@blocksuite/blank/blocks/paragraph';
import { ViewportLayoutPainter } from '@blocksuite/blank/gfx/turbo-renderer';

new ViewportLayoutPainter([
  ParagraphLayoutPainterExtension,
  ListLayoutPainterExtension,
  NoteLayoutPainterExtension,
  CodeLayoutPainterExtension,
  ImageLayoutPainterExtension,
]);
