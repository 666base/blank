import type { CSSProperties } from 'react';

import { appIconMap } from './channel';
import { isBlankBuild } from './blank-links';

export function BlankAppLogo({
  size = 24,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={appIconMap.canary}
      width={size}
      height={size}
      alt="Blank"
      className={className}
      style={{
        borderRadius: Math.round(size * 0.22),
        ...style,
      }}
    />
  );
}

export function isBlankBranding() {
  return isBlankBuild();
}

export {
  applyBlankBranding,
  isBlankProduct,
} from '@blank/i18n/blank-branding';
