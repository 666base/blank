import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';

import { AppSidebarService } from '../../services/app-sidebar';
import { navHeaderStyle } from '../index.css';
import * as local from './sidebar-header.css';

/**
 * Scratch-style Overlay drag strip: empty h-11 region only.
 * Interactive controls live below / in the page header (no-drag).
 */
export const SidebarHeader = () => {
  const appSidebarService = useService(AppSidebarService).sidebar;
  const open = useLiveData(appSidebarService.open$);
  const isMac = environment.isMacOs;

  return (
    <div
      className={clsx(
        navHeaderStyle,
        local.dragStrip,
        isMac && local.macTrafficLightPad
      )}
      data-open={open}
      data-tauri-drag-region
      aria-hidden
    />
  );
};

export * from './sidebar-switch';
