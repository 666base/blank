import { DebugLogger } from '@blank/debug';
import { getDefaultWorkspaceName, isBlankBuild } from '../utils/blank-links';
import onboardingUrl from '@blank/templates/onboarding.zip';
import { ZipTransformer } from '@blocksuite/blank/widgets/linked-doc';

import { DocsService } from '../modules/doc';
import { OrganizeService } from '../modules/organize';
import { ensureBlankWorkspaceSchema } from '../modules/workspace/global-schema';
import type { WorkspacesService } from '../modules/workspace';
import { isLocalOnlyMode } from './local-only';
import { isBlankSyncEnabled } from './sync-config';

export async function buildShowcaseWorkspace(
  workspacesService: WorkspacesService,
  flavour: string,
  workspaceName: string
) {
  const meta = await workspacesService.create(flavour, async docCollection => {
    docCollection.meta.initialize();
    docCollection.doc.getMap('meta').set('name', workspaceName);
    if (!isLocalOnlyMode()) {
      const blob = await (await fetch(onboardingUrl)).blob();
      const schema = await ensureBlankWorkspaceSchema();
      await ZipTransformer.importDocs(docCollection, schema, blob);
    }
  });

  const { workspace, dispose } = workspacesService.open({ metadata: meta });

  await workspace.engine.doc.waitForDocReady(workspace.id);

  const docsService = workspace.scope.get(DocsService);

  if (isLocalOnlyMode()) {
    const doc = docsService.createDoc({ title: workspaceName });
    dispose();
    return { meta, defaultDocId: doc.id };
  }

  // should jump to "Getting Started"
  const defaultDoc = docsService.list.docs$.value.find(p =>
    p.title$.value.startsWith('Getting Started')
  );
  const folderTutorialDoc = docsService.list.docs$.value.find(p =>
    p.title$.value.startsWith('How to use folder and Tags')
  );

  // create default organize
  if (folderTutorialDoc) {
    const organizeService = workspace.scope.get(OrganizeService);
    const folderId = organizeService.folderTree.rootFolder.createFolder(
      'First Folder',
      organizeService.folderTree.rootFolder.indexAt('after')
    );
    const firstFolderNode =
      organizeService.folderTree.folderNode$(folderId).value;
    firstFolderNode?.createLink(
      'doc',
      folderTutorialDoc.id,
      firstFolderNode.indexAt('after')
    );
  }

  dispose();

  return { meta, defaultDocId: defaultDoc?.id };
}

const logger = new DebugLogger('createFirstAppData');

export async function createFirstAppData(workspacesService: WorkspacesService) {
  if (isBlankBuild()) {
    return;
  }
  if (localStorage.getItem('is-first-open') !== null) {
    return;
  }
  localStorage.setItem('is-first-open', 'false');
  if (isBlankSyncEnabled()) {
    return;
  }
  const { meta, defaultDocId } = await buildShowcaseWorkspace(
    workspacesService,
    'local',
    getDefaultWorkspaceName()
  );
  logger.info('create first workspace', defaultDocId);
  return { meta, defaultPageId: defaultDocId };
}
