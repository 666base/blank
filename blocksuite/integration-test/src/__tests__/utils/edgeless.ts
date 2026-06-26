import type {
  EdgelessRootBlockComponent,
  PageRootBlockComponent,
} from '@blocksuite/blank/blocks/root';
import type { SurfaceBlockComponent } from '@blocksuite/blank/blocks/surface';
import type { Store } from '@blocksuite/store';

import type { TestBlankEditorContainer } from '../../index.js';

export function getSurface(doc: Store, editor: TestBlankEditorContainer) {
  const surfaceModel = doc.getModelsByFlavour('blank:surface');

  return editor.host!.view.getBlock(
    surfaceModel[0]!.id
  ) as SurfaceBlockComponent;
}

export function getDocRootBlock(
  doc: Store,
  editor: TestBlankEditorContainer,
  mode: 'page'
): PageRootBlockComponent;
export function getDocRootBlock(
  doc: Store,
  editor: TestBlankEditorContainer,
  mode: 'edgeless'
): EdgelessRootBlockComponent;
export function getDocRootBlock(
  doc: Store,
  editor: TestBlankEditorContainer,
  _?: 'edgeless' | 'page'
) {
  return editor.host!.view.getBlock(doc.root!.id) as
    | EdgelessRootBlockComponent
    | PageRootBlockComponent;
}

export function addNote(doc: Store, props: Record<string, any> = {}) {
  const noteId = doc.addBlock(
    'blank:note',
    {
      xywh: '[0, 0, 800, 100]',
      ...props,
    },
    doc.root
  );

  doc.addBlock('blank:paragraph', {}, noteId);

  return noteId;
}
