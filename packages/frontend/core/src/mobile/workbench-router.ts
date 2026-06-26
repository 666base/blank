import type { RouteObject } from 'react-router-dom';

import { Component as MobileDetailPage } from './pages/workspace/detail/mobile-detail-page';
import { Component as MobileHomePage } from './pages/workspace/home';
import { Component as JournalsPage } from './pages/workspace/journals';

export const workbenchRoutes = [
  {
    path: '/home',
    Component: MobileHomePage,
  },
  {
    path: '/home/collections',
    Component: MobileHomePage,
  },
  {
    path: '/home/tags',
    Component: MobileHomePage,
  },
  {
    path: '/search',
    lazy: () => import('./pages/workspace/search'),
  },
  {
    path: '/all',
    lazy: () => import('./pages/workspace/home-redirect'),
  },
  {
    path: '/collection',
    lazy: () => import('./pages/workspace/home-redirect'),
  },
  {
    path: '/collection/:collectionId',
    lazy: () => import('./pages/workspace/collection/detail'),
  },
  {
    path: '/tag',
    lazy: () => import('./pages/workspace/home-redirect'),
  },
  {
    path: '/tag/:tagId',
    lazy: () => import('./pages/workspace/tag/detail'),
  },
  {
    path: '/journals',
    Component: JournalsPage,
  },
  {
    path: '/trash',
    lazy: () => import('./pages/workspace/trash'),
  },
  {
    path: '/:pageId',
    Component: MobileDetailPage,
  },
  {
    path: '*',
    lazy: () => import('./pages/404'),
  },
] satisfies [RouteObject, ...RouteObject[]];
