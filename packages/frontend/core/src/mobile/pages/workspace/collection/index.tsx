import { WorkbenchService } from '@blank/core/modules/workbench';
import { useThemeColorV2 } from '@blank/component';
import { useService } from '@toeverything/infra';
import { useLayoutEffect } from 'react';

/** @deprecated Collections list is on Home. */
export const Component = () => {
  useThemeColorV2('layer/background/mobile/primary');
  const workbench = useService(WorkbenchService).workbench;

  useLayoutEffect(() => {
    workbench.open('/home/collections', { replaceHistory: true });
  }, [workbench]);

  return null;
};
