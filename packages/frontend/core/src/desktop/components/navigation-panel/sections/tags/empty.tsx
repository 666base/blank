import { useI18n } from '@blank/i18n';
import { TagIcon } from '@blocksuite/icons/rc';

import { NavigationPanelEmptySection } from '../../layouts/empty-section';

export const RootEmpty = () => {
  const t = useI18n();

  return (
    <NavigationPanelEmptySection
      icon={TagIcon}
      message={t['com.blank.rootAppSidebar.tags.empty']()}
      messageTestId="slider-bar-tags-empty-message"
    />
  );
};
