import { WorkbenchService } from '@blank/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import { useLayoutEffect, useMemo } from 'react';

function resolveRedirectTarget(pathname: string) {
  if (pathname === '/collection') {
    return '/home/collections';
  }
  if (pathname === '/tag') {
    return '/home/tags';
  }
  return '/home';
}

export const Component = () => {
  const workbench = useService(WorkbenchService).workbench;
  const pathname = useLiveData(workbench.location$).pathname;
  const to = useMemo(() => resolveRedirectTarget(pathname), [pathname]);

  useLayoutEffect(() => {
    workbench.open(to, { replaceHistory: true });
  }, [to, workbench]);

  return null;
};
