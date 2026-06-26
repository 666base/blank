import type { Framework } from '@toeverything/infra';

import { configureAppTabsHeaderModule } from '../modules/app-tabs-header';
import { configureDesktopApiModule } from '../modules/desktop-api';
import { configureDesktopWorkbenchModule } from '../modules/workbench';
import { configureElectronStateStorageImpls } from './storage';

/** Wire Blank desktop modules for the minimal Blank Electron shell. */
export function configureElectronShellModules(framework: Framework) {
  configureDesktopApiModule(framework);
  configureDesktopWorkbenchModule(framework);
  configureElectronStateStorageImpls(framework);
  configureAppTabsHeaderModule(framework);
}
