import { ensureBlockSuiteEditorEffects } from './block-suite-editor/ensure-effects';

let preloadPromise: Promise<typeof import('./block-suite-editor')> | null = null;

/** Warm the editor chunk + custom elements before the detail page mounts. */
export function preloadBlockSuiteEditor() {
  if (!preloadPromise) {
    preloadPromise = import('./block-suite-editor').then(module => {
      ensureBlockSuiteEditorEffects();
      return module;
    });
  }
  return preloadPromise;
}
