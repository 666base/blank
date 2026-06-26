import type { RouteObject } from 'react-router-dom';

export const workbenchRoutes = [
  {
    path: '/home',
    lazy: () => import('./pages/workspace/home'),
  },
  {
    path: '/search',
    lazy: () => import('./pages/workspace/search'),
  },
  {
    path: '/all',
    lazy: () => import('./pages/workspace/all'),
  },
  {
    path: '/collection',
    lazy: () => import('./pages/workspace/collection/index'),
  },
  {
    path: '/collection/:collectionId',
    lazy: () => import('./pages/workspace/collection/detail'),
  },
  {
    path: '/tag',
    lazy: () => import('./pages/workspace/tag/index'),
  },
  {
    path: '/tag/:tagId',
    lazy: () => import('./pages/workspace/tag/detail'),
  },
  {
    path: '/journals',
    lazy: () => import('./pages/workspace/journals'),
  },
  {
    path: '/trash',
    lazy: () => import('./pages/workspace/trash'),
  },
  {
    path: '/:pageId',
    lazy: () => import('./pages/workspace/detail/mobile-detail-page'),
  },
  {
    path: '*',
    lazy: () => import('./pages/404'),
  },
] satisfies [RouteObject, ...RouteObject[]];
