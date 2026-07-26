/**
 * Blank folder backup — no API keys.
 * Save a zip into a Google Drive / Dropbox / OneDrive sync folder (or any folder).
 */

const FOLDER_HINT_KEY = 'blank.backup.folderHint';

export function getBlankBackupFolderHint(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(FOLDER_HINT_KEY);
}

export function setBlankBackupFolderHint(hint: string | null): void {
  if (typeof localStorage === 'undefined') return;
  if (!hint) localStorage.removeItem(FOLDER_HINT_KEY);
  else localStorage.setItem(FOLDER_HINT_KEY, hint);
}

type BlankWindow = Window & {
  exportWorkspaceSnapshot?: (docs?: string[]) => Promise<void>;
  importWorkspaceSnapshot?: () => Promise<void>;
  showDirectoryPicker?: () => Promise<{ name: string }>;
};

export async function blankExportWorkspaceBackup(): Promise<void> {
  const w = window as BlankWindow;
  if (typeof w.exportWorkspaceSnapshot !== 'function') {
    throw new Error('Open a workspace first, then export again.');
  }
  await w.exportWorkspaceSnapshot();
}

export async function blankImportWorkspaceBackup(): Promise<void> {
  const w = window as BlankWindow;
  if (typeof w.importWorkspaceSnapshot !== 'function') {
    throw new Error('Open a workspace first, then import again.');
  }
  await w.importWorkspaceSnapshot();
}

/** Save a named hint after the user picks where they keep backups (Drive folder, etc.). */
export async function blankPickBackupFolderHint(): Promise<string | null> {
  const w = window as BlankWindow;
  if (typeof w.showDirectoryPicker === 'function') {
    try {
      const dir = await w.showDirectoryPicker();
      const hint = dir.name || 'Selected folder';
      setBlankBackupFolderHint(hint);
      return hint;
    } catch (e) {
      // user cancelled
      if (e instanceof DOMException && e.name === 'AbortError') return null;
      throw e;
    }
  }
  // Fallback: remember a typed/default label — export still uses the browser download dialog.
  const hint =
    getBlankBackupFolderHint() ||
    'Downloads (move the zip into your Google Drive folder)';
  setBlankBackupFolderHint(hint);
  return hint;
}
