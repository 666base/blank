import { Component as IndexBootstrap } from '@affine/core/desktop/pages/index';

import { AppFallback } from '../components/app-fallback';

export const Component = () => {
  return (
    <IndexBootstrap defaultIndexRoute="home" fallback={<AppFallback />}>
      <AppFallback />
    </IndexBootstrap>
  );
};
