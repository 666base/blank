import { wrapCreateBrowserRouterV6 } from '@sentry/react';
import { useEffect, useState } from 'react';
import type { RouteObject } from 'react-router-dom';
import {
  createBrowserRouter as reactRouterCreateBrowserRouter,
  redirect,
  useNavigate,
} from 'react-router-dom';

import { AppContainer } from './components/app-container';
import { AffineErrorComponent } from '../components/affine/affine-error-boundary/affine-error-fallback';
import { NavigateContext } from '../components/hooks/use-navigate-helper';
import { RootWrapper } from './pages/root';
import {
  CATCH_ALL_ROUTE_PATH,
  getWorkspaceDocPath,
  NOT_FOUND_ROUTE_PATH,
  SHARE_ROUTE_PATH,
  WORKSPACE_ROUTE_PATH,
} from './route-paths';

export function RootRouter() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // a hack to make sure router is ready
    setReady(true);
  }, []);

  return ready ? (
    <NavigateContext.Provider value={navigate}>
      <RootWrapper />
    </NavigateContext.Provider>
  ) : (
    <AppContainer fallback />
  );
}

export const topLevelRoutes = [
  {
    element: <RootRouter />,
    errorElement: <AffineErrorComponent />,
    children: [
      {
        path: '/',
        lazy: () => import('./pages/index'),
      },
      {
        path: WORKSPACE_ROUTE_PATH,
        lazy: () => import('./pages/workspace/index'),
      },
      {
        path: SHARE_ROUTE_PATH,
        loader: ({ params }) => {
          return redirect(
            getWorkspaceDocPath(params.workspaceId ?? '', params.pageId ?? '')
          );
        },
      },
      {
        path: NOT_FOUND_ROUTE_PATH,
        lazy: () => import('./pages/404'),
      },
      {
        path: '/expired',
        loader: () => redirect('/'),
      },
      {
        path: '/invite/:inviteId',
        loader: () => redirect('/'),
      },
      {
        path: '/upgrade-success',
        loader: () => redirect('/'),
      },
      {
        path: '/upgrade-success/team',
        loader: () => redirect('/'),
      },
      {
        path: '/upgrade-success/self-hosted-team',
        loader: () => redirect('/'),
      },
      {
        path: '/ai-upgrade-success',
        loader: () => redirect('/'),
      },
      {
        path: '/onboarding',
        lazy: () => import('./pages/onboarding'),
      },
      {
        path: '/redirect-proxy',
        lazy: () => import('./pages/redirect'),
      },
      {
        path: '/subscribe',
        loader: () => redirect('/'),
      },
      {
        path: '/upgrade-to-team',
        loader: () => redirect('/'),
      },
      {
        path: '/try-cloud',
        loader: () => redirect('/'),
      },
      {
        path: '/theme-editor',
        lazy: () => import('./pages/theme-editor'),
      },
      {
        path: '/clipper/import',
        lazy: () => import('./pages/import-clipper'),
      },
      {
        path: '/template/import',
        lazy: () => import('./pages/import-template'),
      },
      {
        path: '/template/preview',
        loader: ({ request }) => {
          const url = new URL(request.url);
          const workspaceId = url.searchParams.get('workspaceId');
          const docId = url.searchParams.get('docId');
          const templateName = url.searchParams.get('name');
          const templateMode = url.searchParams.get('mode');
          const snapshotUrl = url.searchParams.get('snapshotUrl');

          return redirect(
            `/workspace/${workspaceId}/${docId}?${new URLSearchParams({
              isTemplate: 'true',
              templateName: templateName ?? '',
              snapshotUrl: snapshotUrl ?? '',
              mode: templateMode ?? 'page',
            }).toString()}`
          );
        },
      },
      {
        path: '/auth/:authType',
        loader: () => redirect('/'),
      },
      {
        path: '/sign-In',
        loader: () => redirect('/'),
      },
      {
        path: '/magic-link',
        loader: () => redirect('/'),
      },
      {
        path: '/oauth/login',
        loader: () => redirect('/'),
      },
      {
        path: '/oauth/callback',
        loader: () => redirect('/'),
      },
      // deprecated, keep for old client compatibility
      // TODO(@forehalo): remove
      {
        path: '/desktop-signin',
        loader: () => redirect('/'),
      },
      // deprecated, keep for old client compatibility
      // use '/sign-in'
      // TODO(@forehalo): remove
      {
        path: '/signIn',
        loader: () => redirect('/'),
      },
      {
        path: '/open-app/:action',
        loader: () => redirect('/'),
      },
      {
        path: CATCH_ALL_ROUTE_PATH,
        lazy: () => import('./pages/404'),
      },
    ],
  },
] satisfies [RouteObject, ...RouteObject[]];

const createBrowserRouter = wrapCreateBrowserRouterV6(
  reactRouterCreateBrowserRouter
);
export const router = (
  window.SENTRY_RELEASE ? createBrowserRouter : reactRouterCreateBrowserRouter
)(topLevelRoutes, {
  basename: environment.subPath,
  future: {
    v7_normalizeFormMethod: true,
  },
});
