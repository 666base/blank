import { WorkbenchService } from '@blank/core/modules/workbench';
import { useService } from '@toeverything/infra';
import { useLayoutEffect } from 'react';

/** @deprecated Collections list is on Home. */
export const Component = () => {
  const workbench = useService(WorkbenchService).workbench;

  useLayoutEffect(() => {
    workbench.open('/home/collections', { replaceHistory: true });
  }, [workbench]);

  return null;
};
