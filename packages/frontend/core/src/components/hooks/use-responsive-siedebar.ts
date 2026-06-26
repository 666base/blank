import { observeResize } from '@blank/component';
import { AppSidebarService } from '@blank/core/modules/app-sidebar';
import { WorkbenchService } from '@blank/core/modules/workbench';
import { isDesktopApp } from '@blank/core/utils/local-only';
import { useService } from '@toeverything/infra';
import { useCallback, useEffect, useRef } from 'react';

let OBSERVED = false;

export const useResponsiveSidebar = (
  hideThreshold = 540,
  floatThreshold = 768
) => {
  const previousWidthRef = useRef<number | null>(null);

  const appSidebarService = useService(AppSidebarService);
  const workbenchService = useService(WorkbenchService);

  const handleHideSidebar = useCallback(() => {
    appSidebarService.sidebar.setOpen(false);
    workbenchService.workbench.setSidebarOpen(false);
  }, [appSidebarService, workbenchService]);

  const handleFloatSidebar = useCallback(
    (float: boolean) => {
      appSidebarService.sidebar.setSmallScreenMode(float);
    },
    [appSidebarService.sidebar]
  );

  useEffect(() => {
    if (OBSERVED) {
      console.warn(
        `"${useResponsiveSidebar.name}" already observed, do not call it multiple times`
      );
      return;
    }

    OBSERVED = true;
    const unobserve = observeResize(document.body, entry => {
      if (BUILD_CONFIG.isMobileEdition) {
        return;
      }

      const width = entry.contentRect.width;
      const previousWidth = previousWidthRef.current;

      if (previousWidth === null) {
        previousWidthRef.current = width;
        return;
      }

      // should hide sidebar
      if (width <= hideThreshold && previousWidth > hideThreshold) {
        handleHideSidebar();
      }

      if (!isDesktopApp()) {
        if (width >= floatThreshold && previousWidth < floatThreshold) {
          handleFloatSidebar(false);
        }
        if (width <= floatThreshold && previousWidth > floatThreshold) {
          handleFloatSidebar(true);
        }
      }

      previousWidthRef.current = width;
    });

    return () => {
      OBSERVED = false;
      unobserve();
    };
  }, [floatThreshold, handleFloatSidebar, handleHideSidebar, hideThreshold]);
};
