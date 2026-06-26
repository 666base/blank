import { Menu } from '@blank/component';
import { MenuItem } from '@blank/core/modules/app-sidebar/views';
import { NotificationCountService } from '@blank/core/modules/notification';
import { useI18n } from '@blank/i18n';
import { track } from '@blank/track';
import { NotificationIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';

import { NotificationList } from '../notification/list';
import * as styles from './notification-button.style.css';

const Badge = ({
  count,
  onClick,
  className,
}: {
  count: number;
  onClick?: () => void;
  className?: string;
}) => {
  if (count === 0) {
    return null;
  }
  return (
    <div className={className ?? styles.badge} onClick={onClick}>
      {count > 99 ? '99+' : count}
    </div>
  );
};

const NotificationIconTrigger = ({
  count,
  active,
}: {
  count: number;
  active: boolean;
}) => (
  <div
    className={styles.iconTrigger}
    data-active={active}
    style={{ color: cssVarV2.icon.primary }}
  >
    <NotificationIcon width={20} height={20} />
    <Badge count={count} className={styles.iconBadge} />
  </div>
);

export const NotificationButton = ({
  iconOnly = false,
}: {
  iconOnly?: boolean;
}) => {
  const notificationCountService = useService(NotificationCountService);
  const notificationCount = useLiveData(notificationCountService.count$);

  const t = useI18n();

  const [notificationListOpen, setNotificationListOpen] = useState(false);

  const handleNotificationListOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        track.$.sidebar.notifications.openInbox({
          unreadCount: notificationCountService.count$.value,
        });
      }
      setNotificationListOpen(open);
    },
    [notificationCountService.count$.value]
  );

  return (
    <Menu
      rootOptions={{
        open: notificationListOpen,
        onOpenChange: handleNotificationListOpenChange,
      }}
      contentOptions={{
        side: 'right',
        sideOffset: -50,
      }}
      items={<NotificationList />}
    >
      {iconOnly ? (
        <NotificationIconTrigger
          count={notificationCount}
          active={notificationListOpen}
        />
      ) : (
        <MenuItem
          icon={<NotificationIcon />}
          postfix={<Badge count={notificationCount} />}
          active={notificationListOpen}
          postfixDisplay="always"
        >
          <span data-testid="notification-button">
            {t['com.blank.rootAppSidebar.notifications']()}
          </span>
        </MenuItem>
      )}
    </Menu>
  );
};
