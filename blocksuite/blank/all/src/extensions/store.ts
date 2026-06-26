import { AttachmentStoreExtension } from '@blocksuite/blank-block-attachment/store';
import { BookmarkStoreExtension } from '@blocksuite/blank-block-bookmark/store';
import { CalloutStoreExtension } from '@blocksuite/blank-block-callout/store';
import { CodeStoreExtension } from '@blocksuite/blank-block-code/store';
import { DataViewStoreExtension } from '@blocksuite/blank-block-data-view/store';
import { DatabaseStoreExtension } from '@blocksuite/blank-block-database/store';
import { DividerStoreExtension } from '@blocksuite/blank-block-divider/store';
import { EdgelessTextStoreExtension } from '@blocksuite/blank-block-edgeless-text/store';
import { EmbedStoreExtension } from '@blocksuite/blank-block-embed/store';
import { EmbedDocStoreExtension } from '@blocksuite/blank-block-embed-doc/store';
import { FrameStoreExtension } from '@blocksuite/blank-block-frame/store';
import { ImageStoreExtension } from '@blocksuite/blank-block-image/store';
import { LatexStoreExtension } from '@blocksuite/blank-block-latex/store';
import { ListStoreExtension } from '@blocksuite/blank-block-list/store';
import { NoteStoreExtension } from '@blocksuite/blank-block-note/store';
import { ParagraphStoreExtension } from '@blocksuite/blank-block-paragraph/store';
import { RootStoreExtension } from '@blocksuite/blank-block-root/store';
import { SurfaceStoreExtension } from '@blocksuite/blank-block-surface/store';
import { SurfaceRefStoreExtension } from '@blocksuite/blank-block-surface-ref/store';
import { TableStoreExtension } from '@blocksuite/blank-block-table/store';
import { FoundationStoreExtension } from '@blocksuite/blank-foundation/store';
import { BrushStoreExtension } from '@blocksuite/blank-gfx-brush/store';
import { ConnectorStoreExtension } from '@blocksuite/blank-gfx-connector/store';
import { GroupStoreExtension } from '@blocksuite/blank-gfx-group/store';
import { MindmapStoreExtension } from '@blocksuite/blank-gfx-mindmap/store';
import { ShapeStoreExtension } from '@blocksuite/blank-gfx-shape/store';
import { TextStoreExtension } from '@blocksuite/blank-gfx-text/store';
import { FootnoteStoreExtension } from '@blocksuite/blank-inline-footnote/store';
import { LatexStoreExtension as InlineLatexStoreExtension } from '@blocksuite/blank-inline-latex/store';
import { LinkStoreExtension } from '@blocksuite/blank-inline-link/store';
import { InlinePresetStoreExtension } from '@blocksuite/blank-inline-preset/store';
import { ReferenceStoreExtension } from '@blocksuite/blank-inline-reference/store';

export function getInternalStoreExtensions() {
  return [
    FoundationStoreExtension,

    AttachmentStoreExtension,
    BookmarkStoreExtension,
    CalloutStoreExtension,
    CodeStoreExtension,
    DataViewStoreExtension,
    DatabaseStoreExtension,
    DividerStoreExtension,
    EdgelessTextStoreExtension,
    EmbedStoreExtension,
    EmbedDocStoreExtension,
    FrameStoreExtension,
    ImageStoreExtension,
    LatexStoreExtension,
    ListStoreExtension,
    NoteStoreExtension,
    ParagraphStoreExtension,
    SurfaceRefStoreExtension,
    TableStoreExtension,
    SurfaceStoreExtension,
    RootStoreExtension,

    FootnoteStoreExtension,
    LinkStoreExtension,
    ReferenceStoreExtension,
    InlineLatexStoreExtension,
    InlinePresetStoreExtension,

    BrushStoreExtension,
    ShapeStoreExtension,
    MindmapStoreExtension,
    ConnectorStoreExtension,
    GroupStoreExtension,
    TextStoreExtension,
  ];
}
