import type { FC } from 'react';
import {
  CalendarPanelIcon,
  EditIcon,
  HomeIcon,
  HomePanelIcon,
  TodayIcon,
} from '@blocksuite/icons/rc';

export type TabBarIconName = 'home' | 'journal' | 'create';

const tabBarIcons: Record<
  TabBarIconName,
  { outline: FC; solid: FC }
> = {
  home: { outline: HomeIcon, solid: HomePanelIcon },
  journal: { outline: TodayIcon, solid: CalendarPanelIcon },
  create: { outline: EditIcon, solid: EditIcon },
};

export const TabBarIcon = ({
  name,
  active,
}: {
  name: TabBarIconName;
  active: boolean;
}) => {
  const Icon = active ? tabBarIcons[name].solid : tabBarIcons[name].outline;
  return <Icon />;
};
