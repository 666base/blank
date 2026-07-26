import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';

import { AppSidebarService } from '../../services/app-sidebar';
import { navHeaderStyle } from '../index.css';
import * as local from './sidebar-header.css';
import { SidebarSwitch } from './sidebar-switch';

export const SidebarHeader = () => {
  const appSidebarService = useService(AppSidebarService).sidebar;
  const open = useLiveData(appSidebarService.open$);
  const isMac = environment.isMacOs;

  return (
    <div
      className={clsx(navHeaderStyle, isMac && local.macTrafficLightPad)}
      data-open={open}
      data-tauri-drag-region
    >
      <div className={clsx(local.headerControls, 'titlebar-no-drag')}>
        <SidebarSwitch show={open} />
      </div>
    </div>
  );
};

export * from './sidebar-switch';
