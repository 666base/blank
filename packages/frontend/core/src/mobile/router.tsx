import { NavigateContext } from '@blank/core/components/hooks/use-navigate-helper';
import { getInstantBootPath } from '@blank/core/utils/blank-fast-boot';
import { wrapCreateBrowserRouterV6 } from '@sentry/react';
import type { RouteObject } from 'react-router-dom';
import {
  createBrowserRouter as reactRouterCreateBrowserRouter,
  redirect,
  useNavigate,
} from 'react-router-dom';

import { RootWrapper } from './pages/root';

function RootRouter() {
  const navigate = useNavigate();

  return (
    <NavigateContext.Provider value={navigate}>
      <RootWrapper />
    </NavigateContext.Provider>
  );
}

export const topLevelRoutes = [
  {
    element: <RootRouter />,
    children: [
      {
        path: '/',
        loader: ({ request }) => {
          const { pathname } = new URL(request.url);
          if (
            pathname !== '/' &&
            pathname !== '/index.html' &&
            !pathname.endsWith('/index.html')
          ) {
            return null;
          }
          const fast = getInstantBootPath();
          return fast ? redirect(fast) : null;
        },
        lazy: () => import('./pages/index'),
      },
      {
        path: '/workspace/:workspaceId/*',
        lazy: () => import('./pages/workspace/index'),
      },
      {
        path: '/share/:workspaceId/:pageId',
        loader: ({ params }) => {
          return redirect(`/workspace/${params.workspaceId}/${params.pageId}`);
        },
      },
      {
        path: '/404',
        lazy: () => import('./pages/404'),
      },
      {
        path: '/auth/:authType',
        lazy: () => import('./pages/auth'),
      },
      {
        path: '/sign-in',
        lazy: () => import('./pages/sign-in'),
      },
      {
        path: '/magic-link',
        lazy: () =>
          import(
            /* webpackChunkName: "auth" */ '@blank/core/desktop/pages/auth/magic-link'
          ),
      },
      {
        path: '/oauth/login',
        lazy: () =>
          import(
            /* webpackChunkName: "auth" */ '@blank/core/desktop/pages/auth/oauth-login'
          ),
      },
      {
        path: '/oauth/callback',
        lazy: () =>
          import(
            /* webpackChunkName: "auth" */ '@blank/core/desktop/pages/auth/oauth-callback'
          ),
      },
      {
        path: '/redirect-proxy',
        lazy: () => import('@blank/core/desktop/pages/redirect'),
      },
      {
        path: '/open-app/:action',
        lazy: () => import('@blank/core/desktop/pages/open-app'),
      },
      {
        path: '*',
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
  future: {
    v7_normalizeFormMethod: true,
  },
});
