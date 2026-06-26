import { WorkbenchService } from '@blank/core/modules/workbench';
import { useService } from '@toeverything/infra';
import { useLayoutEffect } from 'react';

/** @deprecated Tags list is on Home. */
export const Component = () => {
  const workbench = useService(WorkbenchService).workbench;

  useLayoutEffect(() => {
    workbench.open('/home/tags', { replaceHistory: true });
  }, [workbench]);

  return null;
};
