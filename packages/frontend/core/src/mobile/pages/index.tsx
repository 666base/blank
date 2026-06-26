import { Component as IndexBootstrap } from '@blank/core/desktop/pages/index';
import { isBlankBuild } from '@blank/core/utils/blank-links';

import { AppFallback } from '../components/app-fallback';

const blankFallback = isBlankBuild() ? null : <AppFallback />;

export const Component = () => {
  return (
    <IndexBootstrap defaultIndexRoute="home" fallback={blankFallback}>
      {blankFallback}
    </IndexBootstrap>
  );
};
