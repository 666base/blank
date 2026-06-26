import { isCapacitorNative } from './local-only';

/** Skip expensive View Transitions on mobile — instant navigation feels smoother. */
export function preferInstantNavigation() {
  return (
    BUILD_CONFIG.isMobileEdition ||
    isCapacitorNative() ||
    globalThis.__BLANK_FORCE_MOBILE__ === true
  );
}
