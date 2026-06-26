import { editorEffects } from '@blank/core/blocksuite/editors';

import { registerTemplates } from './register-templates';

let effectsReady = false;

/** Run once before first editor mount — avoids pulling BlockSuite into unrelated chunks. */
export function ensureBlockSuiteEditorEffects() {
  if (effectsReady) {
    return;
  }
  effectsReady = true;
  editorEffects();
  registerTemplates();
}
