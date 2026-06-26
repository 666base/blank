import { useAppSettingHelper } from '@blank/core/components/hooks/blank/use-app-setting-helper';
import { PageDetailLoading } from '@blank/component/page-detail-skeleton';
import { RootAppSidebar } from '@blank/core/components/root-app-sidebar';
import { scheduleRemoveBootSplash } from '@blank/core/utils/blank-fast-boot';
import { AppSidebarService } from '@blank/core/modules/app-sidebar';
import {
  AppSidebarFallback,
  OpenInAppCard,
} from '@blank/core/modules/app-sidebar/views';
import { AppTabsHeader } from '@blank/core/modules/app-tabs-header';
import { AppUpdateBanner } from '@blank/core/components/app-update-banner';
import { WorkspaceService } from '@blank/core/modules/workspace';
import { isDesktopApp, isElectronShell, isLocalOnlyMode } from '@blank/core/utils/local-only';
import {
  useLiveData,
  useService,
  useServiceOptional,
} from '@toeverything/infra';
import clsx from 'clsx';
import {
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  useEffect,
} from 'react';

import * as styles from './styles.css';

export const AppContainer = ({
  children,
  className,
  fallback = false,
  ...rest
}: PropsWithChildren<{
  className?: string;
  fallback?: boolean;
}>) => {
  const { appSettings } = useAppSettingHelper();

  useEffect(() => {
    scheduleRemoveBootSplash();
  }, [fallback]);

  const noisyBackground =
    isDesktopApp() && appSettings.enableNoisyBackground;
  const blurBackground =
    isDesktopApp() &&
    environment.isMacOs &&
    appSettings.enableBlurBackground;
  return (
    <div
      {...rest}
      className={clsx(styles.appStyle, className, {
        'noisy-background': noisyBackground,
        'blur-background': blurBackground,
      })}
      data-noise-background={noisyBackground}
      data-translucent={blurBackground}
    >
      <LayoutComponent fallback={fallback}>{children}</LayoutComponent>
    </div>
  );
};

const DesktopLayout = ({
  children,
  fallback = false,
}: PropsWithChildren<{ fallback?: boolean }>) => {
  const workspaceService = useServiceOptional(WorkspaceService);
  const isInWorkspace = !!workspaceService;
  return (
    <div className={styles.desktopAppViewContainer}>
      <div className={styles.desktopTabsHeader}>
        <AppTabsHeader />
      </div>
      <div className={styles.desktopAppViewMain}>
        <AppUpdateBanner />
        <div className={styles.desktopAppViewMainRow}>
        {fallback ? <AppSidebarFallback /> : isInWorkspace && <RootAppSidebar />}
        <MainContainer fallback={fallback}>{children}</MainContainer>
      </div>
      </div>
    </div>
  );
};

const BrowserLayout = ({
  children,
  fallback = false,
}: PropsWithChildren<{ fallback?: boolean }>) => {
  const workspaceService = useServiceOptional(WorkspaceService);
  const isInWorkspace = !!workspaceService;

  return (
    <div className={styles.browserAppViewContainer}>
      {!isLocalOnlyMode() ? <OpenInAppCard /> : null}
      {fallback ? <AppSidebarFallback /> : isInWorkspace && <RootAppSidebar />}
      <MainContainer fallback={fallback}>{children}</MainContainer>
    </div>
  );
};

const LayoutComponent =
  BUILD_CONFIG.isElectron || isElectronShell()
    ? DesktopLayout
    : BrowserLayout;

const MainContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & { fallback?: boolean }>
>(function MainContainer(
  { className, children, fallback = false, ...props },
  ref
): ReactElement {
  const workspaceService = useServiceOptional(WorkspaceService);
  const isInWorkspace = !!workspaceService;
  const { appSettings } = useAppSettingHelper();
  const appSidebarService = useService(AppSidebarService).sidebar;
  const open = useLiveData(appSidebarService.open$);

  return (
    <div
      {...props}
      className={clsx(styles.mainContainerStyle, className)}
      data-is-desktop={isDesktopApp()}
      data-transparent={false}
      data-client-border={appSettings.clientBorder}
      data-side-bar-open={open && isInWorkspace}
      data-testid="main-container"
      ref={ref}
    >
      {fallback && !children ? <PageDetailLoading /> : children}
    </div>
  );
});

MainContainer.displayName = 'MainContainer';
