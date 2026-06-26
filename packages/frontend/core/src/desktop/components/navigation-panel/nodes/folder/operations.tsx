import { MenuItem } from '@blank/component';
import { IsFavoriteIcon } from '@blank/core/components/pure/icons';
import { CompatibleFavoriteItemsAdapter } from '@blank/core/modules/favorite';
import { useI18n } from '@blank/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';

export const FavoriteFolderOperation = ({ id }: { id: string }) => {
  const t = useI18n();
  const compatibleFavoriteItemsAdapter = useService(
    CompatibleFavoriteItemsAdapter
  );

  const favorite = useLiveData(
    useMemo(() => {
      return compatibleFavoriteItemsAdapter.isFavorite$(id, 'folder');
    }, [compatibleFavoriteItemsAdapter, id])
  );

  return (
    <MenuItem
      prefixIcon={<IsFavoriteIcon favorite={favorite} />}
      onClick={() => compatibleFavoriteItemsAdapter.toggle(id, 'folder')}
    >
      {favorite
        ? t['com.blank.rootAppSidebar.organize.folder-rm-favorite']()
        : t['com.blank.rootAppSidebar.organize.folder-add-favorite']()}
    </MenuItem>
  );
};
