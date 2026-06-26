import '@blocksuite/blank/effects';

import { TestBlankEditorContainer } from './editors/index.js';

export function effects() {
  customElements.define('blank-editor-container', TestBlankEditorContainer);
}
