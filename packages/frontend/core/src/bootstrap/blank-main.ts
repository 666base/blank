/**
 * Blank main-thread bootstrap only (do not import from nbstore.worker).
 */
import { revalidateBlankCloudWorkspaces } from '../modules/workspace-engine';
import { preloadBlankWorkspaceSchema } from '../modules/workspace/global-schema';
import { seedInstantBootStorage, prepareBootShellForApp } from '../utils/blank-fast-boot';
import { isBlankBuild } from '../utils/blank-links';
import { blankGetSession, ensureBlankSupabaseConfig } from '../utils/blank-supabase';

seedInstantBootStorage();
prepareBootShellForApp();
preloadBlankWorkspaceSchema();

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(
    () => {
      void import('../blocksuite/preload-block-suite-editor').then(m =>
        m.preloadBlockSuiteEditor()
      );
    },
    { timeout: 2000 }
  );
} else {
  setTimeout(() => {
    void import('../blocksuite/preload-block-suite-editor').then(m =>
      m.preloadBlockSuiteEditor()
    );
  }, 0);
}

if (isBlankBuild()) {
  const run = () => {
    void (async () => {
      await ensureBlankSupabaseConfig();
      if (
        typeof window !== 'undefined' &&
        (window.location.hash.includes('access_token=') ||
          window.location.search.includes('code='))
      ) {
        const { blankHandleOAuthCallback } = await import(
          '../utils/blank-supabase'
        );
        await blankHandleOAuthCallback();
      }
      await blankGetSession();
      revalidateBlankCloudWorkspaces();
    })();
  };
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 0);
  }
}
