import type { SetStateAction } from 'jotai';
import { atom, useAtom } from 'jotai';

import type { BlankEditorContainer } from '../../blocksuite/block-suite-editor';

const activeEditorContainerAtom = atom<BlankEditorContainer | null>(null);

export function useActiveBlocksuiteEditor(): [
  BlankEditorContainer | null,
  React.Dispatch<SetStateAction<BlankEditorContainer | null>>,
] {
  const [editorContainer, setEditorContainer] = useAtom(
    activeEditorContainerAtom
  );

  return [editorContainer, setEditorContainer];
}
