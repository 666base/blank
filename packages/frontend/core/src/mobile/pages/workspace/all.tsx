import { WorkbenchService } from '@blank/core/modules/workbench';
import { useService } from '@toeverything/infra';
import { useLayoutEffect } from 'react';

/** @deprecated All docs live on Home — kept for old links/bookmarks. */
export const Component = () => {
  const workbench = useService(WorkbenchService).workbench;

  useLayoutEffect(() => {
    workbench.open('/home', { replaceHistory: true });
  }, [workbench]);

  return null;
};
