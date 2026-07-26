import { Scrollable } from '@affine/component';
import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import { useI18n } from '@affine/i18n';
import { FolderIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';

import { useGeneralSettingList } from '../general-setting';
import { useWorkspaceSettingList } from '../workspace-setting';
import * as style from './style.css';

type SettingSidebarItemProps = {
  isActive: boolean;
  icon: ReactNode;
  title: string;
  key: string;
  testId?: string;
  beta?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const SettingSidebarItem = ({
  isActive,
  icon,
  title,
  testId,
  beta,
  ...props
}: SettingSidebarItemProps) => {
  return (
    <div
      {...props}
      title={title}
      data-testid={testId}
      className={clsx(style.sidebarSelectItem, {
        active: isActive,
      })}
    >
      <div className={style.sidebarSelectItemIcon}>{icon}</div>
      <div className={style.sidebarSelectItemName}>{title}</div>
      {beta ? <div className={style.sidebarSelectItemBeta}>Beta</div> : null}
    </div>
  );
};

const SettingSidebarGroup = ({
  title,
  items,
}: {
  title: string;
  items: SettingSidebarItemProps[];
}) => {
  return (
    <div className={style.sidebarGroup}>
      <div className={style.sidebarSubtitle}>{title}</div>
      <div className={style.sidebarItemsWrapper}>
        {items.map(({ key, ...props }) => (
          <SettingSidebarItem key={key} {...props} />
        ))}
      </div>
    </div>
  );
};

/** Opens Data & sync instead of dead AFFiNE Cloud sign-in. */
export const SignInButton = ({
  onTabChange,
}: {
  onTabChange: (key: SettingTab) => void;
}) => {
  return (
    <div
      className={style.accountButton}
      onClick={useCallback(() => {
        onTabChange('blank-sync');
      }, [onTabChange])}
      data-testid="blank-data-sync-entry"
    >
      <div className="avatar not-sign">
        <FolderIcon />
      </div>

      <div className="content">
        <div className="name" title="Data & sync">
          Data & sync
        </div>
        <div className="email" title="Local, folder, or account">
          Local, folder backup, or account
        </div>
      </div>
    </div>
  );
};

export const SettingSidebar = ({
  activeTab,
  onTabChange,
}: {
  activeTab: SettingTab;
  onTabChange: (key: SettingTab) => void;
}) => {
  const t = useI18n();
  const generalList = useGeneralSettingList();
  const workspaceSettingList = useWorkspaceSettingList();
  const gotoTab = useCallback(
    (tab: SettingTab) => {
      onTabChange(tab);
    },
    [onTabChange]
  );

  const groups = useMemo(() => {
    return [
      {
        key: 'setting:general',
        title: t['com.affine.settingSidebar.settings.general'](),
        items: generalList,
      },
      {
        key: 'setting:workspace',
        title: t['com.affine.settingSidebar.settings.workspace'](),
        items: workspaceSettingList,
      },
    ].map(group => {
      return {
        ...group,
        items: group.items.map(item => {
          return {
            ...item,
            isActive: item.key === activeTab,
            'data-event-arg': item.key,
            onClick: () => gotoTab(item.key),
          };
        }),
      };
    });
  }, [activeTab, generalList, gotoTab, t, workspaceSettingList]);

  return (
    <div className={style.settingSlideBar} data-testid="settings-sidebar">
      <div className={style.sidebarTitle}>Settings</div>

      <SignInButton onTabChange={onTabChange} />

      <Scrollable.Root>
        <Scrollable.Viewport>
          {groups.map(group => (
            <SettingSidebarGroup
              key={group.key}
              title={group.title}
              items={group.items}
            />
          ))}
          <Scrollable.Scrollbar />
        </Scrollable.Viewport>
      </Scrollable.Root>
    </div>
  );
};
