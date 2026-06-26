import { FlexWrapper } from '@blank/component';
import { ExplorerDisplayMenuButton } from '@blank/core/components/explorer/display-menu';
import { ViewToggle } from '@blank/core/components/explorer/display-menu/view-toggle';
import { ExplorerNavigation } from '@blank/core/components/explorer/header/navigation';
import type { ExplorerDisplayPreference } from '@blank/core/components/explorer/types';
import { Header } from '@blank/core/components/pure/header';

export const CollectionDetailHeader = ({
  displayPreference,
  onDisplayPreferenceChange,
}: {
  displayPreference: ExplorerDisplayPreference;
  onDisplayPreferenceChange: (
    displayPreference: ExplorerDisplayPreference
  ) => void;
}) => {
  return (
    <Header
      right={
        <FlexWrapper gap={16}>
          <ViewToggle
            view={displayPreference.view ?? 'list'}
            onViewChange={view => {
              onDisplayPreferenceChange({ ...displayPreference, view });
            }}
          />
          <ExplorerDisplayMenuButton
            displayPreference={displayPreference}
            onDisplayPreferenceChange={onDisplayPreferenceChange}
          />
        </FlexWrapper>
      }
      left={<ExplorerNavigation active="collections" />}
    />
  );
};
