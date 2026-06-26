export const BLANK_DOC_SNAPSHOT_PREFIX = 'blank_doc_snapshot:';

export type BlankDocSnapshot = {
  title: string;
  preview: string;
  updatedAt: number;
};

const MAX_PREVIEW_LENGTH = 600;

export function getDocSnapshotStorageKey(workspaceId: string, pageId: string) {
  return `${BLANK_DOC_SNAPSHOT_PREFIX}${workspaceId}:${pageId}`;
}

/** Synchronous read — used before editor init and in inline boot script. */
export function readDocSnapshotSync(
  workspaceId: string,
  pageId: string
): BlankDocSnapshot | null {
  try {
    const raw = globalThis.localStorage?.getItem(
      getDocSnapshotStorageKey(workspaceId, pageId)
    );
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<BlankDocSnapshot>;
    if (!parsed || typeof parsed.title !== 'string') {
      return null;
    }
    return {
      title: parsed.title,
      preview:
        typeof parsed.preview === 'string'
          ? parsed.preview.slice(0, MAX_PREVIEW_LENGTH)
          : '',
      updatedAt:
        typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function persistDocSnapshot(
  workspaceId: string,
  pageId: string,
  snapshot: Pick<BlankDocSnapshot, 'title' | 'preview'>
) {
  try {
    const data: BlankDocSnapshot = {
      title: snapshot.title,
      preview: snapshot.preview.slice(0, MAX_PREVIEW_LENGTH),
      updatedAt: Date.now(),
    };
    globalThis.localStorage?.setItem(
      getDocSnapshotStorageKey(workspaceId, pageId),
      JSON.stringify(data)
    );
  } catch {
    // ignore quota / private mode
  }
}
