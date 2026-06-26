import { NavigationPanelService } from '@blank/core/modules/navigation-panel';
import { ArrowDownSmallIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import {
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
  useCallback,
} from 'react';

import {
  collapsedIconContainer,
  iconContainer,
  itemContent,
  itemRoot,
  postfix,
} from '../tree/node.css';
import * as styles from './collapsible-section.css';

interface CollapsibleSectionProps extends PropsWithChildren {
  path: string[];
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;

  className?: string;
  testId?: string;

  headerRef?: RefObject<HTMLDivElement>;
  headerTestId?: string;
  headerClassName?: string;

  contentClassName?: string;
  contentStyle?: CSSProperties;
}

export const CollapsibleSection = ({
  path,
  title,
  icon,
  actions,
  children,

  className,
  testId,

  headerRef,
  headerTestId,
  headerClassName,

  contentClassName,
  contentStyle,
}: CollapsibleSectionProps) => {
  const navigationPanelService = useService(NavigationPanelService);

  const collapsed = useLiveData(navigationPanelService.collapsed$(path));

  const setCollapsed = useCallback(
    (v: boolean) => {
      navigationPanelService.setCollapsed(path, v);
    },
    [navigationPanelService, path]
  );

  const handleToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <Collapsible.Root
      data-collapsed={collapsed}
      className={clsx(styles.root, className)}
      open={!collapsed}
      data-testid={testId}
    >
      <div
        ref={headerRef}
        data-testid={headerTestId}
        className={clsx(itemRoot, styles.header, headerClassName)}
        data-collapsible="true"
        onClick={handleToggle}
      >
        <div
          className={collapsedIconContainer}
          data-collapsed={collapsed}
          data-disabled="false"
        >
          <ArrowDownSmallIcon width={16} height={16} />
        </div>
        {icon ? <div className={iconContainer}>{icon}</div> : null}
        <span className={itemContent}>{title}</span>
        {actions ? (
          <div className={postfix} onClick={e => e.stopPropagation()}>
            {actions}
          </div>
        ) : null}
      </div>
      <Collapsible.Content
        data-testid="collapsible-section-content"
        className={clsx(styles.content, contentClassName)}
        style={contentStyle}
      >
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
