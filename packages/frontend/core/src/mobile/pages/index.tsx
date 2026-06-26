import { Component as IndexBootstrap } from '@blank/core/desktop/pages/index';
import { isBlankBuild } from '@blank/core/utils/blank-links';

import { AppFallback } from '../components/app-fallback';
import { MobileBootPlaceholder } from '../components/boot-placeholder';

const blankFallback = isBlankBuild() ? (
  <MobileBootPlaceholder />
) : (
  <AppFallback />
);

export const Component = () => {
  return (
    <IndexBootstrap defaultIndexRoute="home" fallback={blankFallback}>
      {blankFallback}
    </IndexBootstrap>
  );
};
