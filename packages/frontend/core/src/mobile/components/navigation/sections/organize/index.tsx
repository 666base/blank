import { Skeleton } from '@blank/component';
import { NavigationPanelTreeRoot } from '@blank/core/desktop/components/navigation-panel';
import { NavigationPanelService } from '@blank/core/modules/navigation-panel';
import { OrganizeService } from '@blank/core/modules/organize';
import { useI18n } from '@blank/i18n';
import track from '@blank/track';
import { AddOrganizeIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';

import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelFolderNode } from '../../nodes/folder';
import { FolderCreateTip, FolderRenameDialog } from '../../nodes/folder/dialog';

export const NavigationPanelOrganize = () => {
  const { organizeService, navigationPanelService } = useServices({
    OrganizeService,
    NavigationPanelService,
  });
  const path = useMemo(() => ['organize'], []);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);

  const t = useI18n();

  const folderTree = organizeService.folderTree;
  const rootFolder = folderTree.rootFolder;

  const folders = useLiveData(rootFolder.sortedChildren$);
  const isLoading = useLiveData(folderTree.isLoading$);

  const handleCreateFolder = useCallback(
    (name: string) => {
      const newFolderId = rootFolder.createFolder(
        name,
        rootFolder.indexAt('before')
      );
      track.$.navigationPanel.organize.createOrganizeItem({ type: 'folder' });
      navigationPanelService.setCollapsed(path, false);
      return newFolderId;
    },
    [navigationPanelService, path, rootFolder]
  );

  return (
    <CollapsibleSection
      path={path}
      title={t['com.blank.rootAppSidebar.organize']()}
    >
      {/* TODO(@CatsJuice): Organize loading UI */}
      <NavigationPanelTreeRoot placeholder={isLoading ? <Skeleton /> : null}>
        {folders.map(child => (
          <NavigationPanelFolderNode
            key={child.id}
            nodeId={child.id as string}
            parentPath={path}
          />
        ))}
        <AddItemPlaceholder
          icon={<AddOrganizeIcon />}
          data-testid="navigation-panel-bar-add-organize-button"
          label={t['com.blank.rootAppSidebar.organize.add-folder']()}
          onClick={() => setOpenNewFolderDialog(true)}
        />
      </NavigationPanelTreeRoot>
      <FolderRenameDialog
        open={openNewFolderDialog}
        onConfirm={handleCreateFolder}
        onOpenChange={setOpenNewFolderDialog}
        descRenderer={FolderCreateTip}
      />
    </CollapsibleSection>
  );
};
