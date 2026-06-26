import { GlobalCacheService } from '@blank/core/modules/storage';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { type PropsWithChildren, useCallback, useMemo } from 'react';

import { cacheKey } from './constants';
import { tabItem } from './styles.css';

export interface TabItemProps extends PropsWithChildren {
  id: string;
  label: string;
  onClick?: (isActive: boolean) => void;
  /** Action tabs (e.g. create) should not stay highlighted after tap. */
  persistActive?: boolean;
}

export const TabItem = ({
  id,
  label,
  children,
  onClick,
  persistActive = true,
}: TabItemProps) => {
  const globalCache = useService(GlobalCacheService).globalCache;
  const activeTabId$ = useMemo(
    () => LiveData.from(globalCache.watch(cacheKey), 'home'),
    [globalCache]
  );
  const activeTabId = useLiveData(activeTabId$) ?? 'home';
  const normalizedActiveTabId =
    activeTabId === 'all' ? 'home' : activeTabId;

  const isActive = id === normalizedActiveTabId;

  const handleClick = useCallback(() => {
    if (persistActive) {
      globalCache.set(cacheKey, id);
    }
    onClick?.(isActive);
  }, [globalCache, id, isActive, onClick, persistActive]);

  return (
    <li
      className={tabItem}
      role="tab"
      aria-label={label}
      data-active={isActive}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};
