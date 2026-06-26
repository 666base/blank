import { AttachmentViewExtension } from '@blocksuite/blank-block-attachment/view';
import { BookmarkViewExtension } from '@blocksuite/blank-block-bookmark/view';
import { CalloutViewExtension } from '@blocksuite/blank-block-callout/view';
import { CodeBlockViewExtension } from '@blocksuite/blank-block-code/view';
import { DataViewViewExtension } from '@blocksuite/blank-block-data-view/view';
import { DatabaseViewExtension } from '@blocksuite/blank-block-database/view';
import { DividerViewExtension } from '@blocksuite/blank-block-divider/view';
import { EdgelessTextViewExtension } from '@blocksuite/blank-block-edgeless-text/view';
import { EmbedViewExtension } from '@blocksuite/blank-block-embed/view';
import { EmbedDocViewExtension } from '@blocksuite/blank-block-embed-doc/view';
import { FrameViewExtension } from '@blocksuite/blank-block-frame/view';
import { ImageViewExtension } from '@blocksuite/blank-block-image/view';
import { LatexViewExtension } from '@blocksuite/blank-block-latex/view';
import { ListViewExtension } from '@blocksuite/blank-block-list/view';
import { NoteViewExtension } from '@blocksuite/blank-block-note/view';
import { ParagraphViewExtension } from '@blocksuite/blank-block-paragraph/view';
import { RootViewExtension } from '@blocksuite/blank-block-root/view';
import { SurfaceViewExtension } from '@blocksuite/blank-block-surface/view';
import { SurfaceRefViewExtension } from '@blocksuite/blank-block-surface-ref/view';
import { TableViewExtension } from '@blocksuite/blank-block-table/view';
import { FoundationViewExtension } from '@blocksuite/blank-foundation/view';
import { AdapterPanelViewExtension } from '@blocksuite/blank-fragment-adapter-panel/view';
import { DocTitleViewExtension } from '@blocksuite/blank-fragment-doc-title/view';
import { FramePanelViewExtension } from '@blocksuite/blank-fragment-frame-panel/view';
import { OutlineViewExtension } from '@blocksuite/blank-fragment-outline/view';
import { BrushViewExtension } from '@blocksuite/blank-gfx-brush/view';
import { ConnectorViewExtension } from '@blocksuite/blank-gfx-connector/view';
import { GroupViewExtension } from '@blocksuite/blank-gfx-group/view';
import { LinkViewExtension as GfxLinkViewExtension } from '@blocksuite/blank-gfx-link/view';
import { MindmapViewExtension } from '@blocksuite/blank-gfx-mindmap/view';
import { NoteViewExtension as GfxNoteViewExtension } from '@blocksuite/blank-gfx-note/view';
import { PointerViewExtension } from '@blocksuite/blank-gfx-pointer/view';
import { ShapeViewExtension } from '@blocksuite/blank-gfx-shape/view';
import { TemplateViewExtension } from '@blocksuite/blank-gfx-template/view';
import { TextViewExtension } from '@blocksuite/blank-gfx-text/view';
import { InlineCommentViewExtension } from '@blocksuite/blank-inline-comment/view';
import { FootnoteViewExtension } from '@blocksuite/blank-inline-footnote/view';
import { LatexViewExtension as InlineLatexViewExtension } from '@blocksuite/blank-inline-latex/view';
import { LinkViewExtension } from '@blocksuite/blank-inline-link/view';
import { MentionViewExtension } from '@blocksuite/blank-inline-mention/view';
import { InlinePresetViewExtension } from '@blocksuite/blank-inline-preset/view';
import { ReferenceViewExtension } from '@blocksuite/blank-inline-reference/view';
import { DragHandleViewExtension } from '@blocksuite/blank-widget-drag-handle/view';
import { EdgelessAutoConnectViewExtension } from '@blocksuite/blank-widget-edgeless-auto-connect/view';
import { EdgelessDraggingAreaViewExtension } from '@blocksuite/blank-widget-edgeless-dragging-area/view';
import { EdgelessSelectedRectViewExtension } from '@blocksuite/blank-widget-edgeless-selected-rect/view';
import { EdgelessToolbarViewExtension } from '@blocksuite/blank-widget-edgeless-toolbar/view';
import { EdgelessZoomToolbarViewExtension } from '@blocksuite/blank-widget-edgeless-zoom-toolbar/view';
import { FrameTitleViewExtension } from '@blocksuite/blank-widget-frame-title/view';
import { KeyboardToolbarViewExtension } from '@blocksuite/blank-widget-keyboard-toolbar/view';
import { LinkedDocViewExtension } from '@blocksuite/blank-widget-linked-doc/view';
import { NoteSlicerViewExtension } from '@blocksuite/blank-widget-note-slicer/view';
import { PageDraggingAreaViewExtension } from '@blocksuite/blank-widget-page-dragging-area/view';
import { RemoteSelectionViewExtension } from '@blocksuite/blank-widget-remote-selection/view';
import { ScrollAnchoringViewExtension } from '@blocksuite/blank-widget-scroll-anchoring/view';
import { SlashMenuViewExtension } from '@blocksuite/blank-widget-slash-menu/view';
import { ToolbarViewExtension } from '@blocksuite/blank-widget-toolbar/view';
import { ViewportOverlayViewExtension } from '@blocksuite/blank-widget-viewport-overlay/view';

export function getInternalViewExtensions() {
  return [
    FoundationViewExtension,

    // Gfx
    PointerViewExtension,
    GfxNoteViewExtension,
    BrushViewExtension,
    ShapeViewExtension,
    MindmapViewExtension,
    ConnectorViewExtension,
    GroupViewExtension,
    TextViewExtension,
    TemplateViewExtension,
    GfxLinkViewExtension,

    // Block
    AttachmentViewExtension,
    BookmarkViewExtension,
    CalloutViewExtension,
    CodeBlockViewExtension,
    DataViewViewExtension,
    DatabaseViewExtension,
    DividerViewExtension,
    EdgelessTextViewExtension,
    EmbedViewExtension,
    EmbedDocViewExtension,
    FrameViewExtension,
    ImageViewExtension,
    LatexViewExtension,
    ListViewExtension,
    NoteViewExtension,
    ParagraphViewExtension,
    SurfaceRefViewExtension,
    TableViewExtension,
    SurfaceViewExtension,
    RootViewExtension,

    // Inline
    InlineCommentViewExtension,
    FootnoteViewExtension,
    LinkViewExtension,
    ReferenceViewExtension,
    InlineLatexViewExtension,
    MentionViewExtension,
    InlinePresetViewExtension,

    // Widget
    // order will affect the z-index of the widget
    DragHandleViewExtension,
    EdgelessAutoConnectViewExtension,
    FrameTitleViewExtension,
    KeyboardToolbarViewExtension,
    LinkedDocViewExtension,
    RemoteSelectionViewExtension,
    ScrollAnchoringViewExtension,
    SlashMenuViewExtension,
    ToolbarViewExtension,
    ViewportOverlayViewExtension,
    EdgelessZoomToolbarViewExtension,
    PageDraggingAreaViewExtension,
    EdgelessSelectedRectViewExtension,
    EdgelessDraggingAreaViewExtension,
    NoteSlicerViewExtension,
    EdgelessToolbarViewExtension,

    // Fragment
    DocTitleViewExtension,
    FramePanelViewExtension,
    OutlineViewExtension,
    AdapterPanelViewExtension,
  ];
}
