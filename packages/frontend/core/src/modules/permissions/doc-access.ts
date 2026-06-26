import { isBlankBuild } from '../../utils/blank-links';
import { isCapacitorNative, isElectronShell } from '../../utils/local-only';

function isNativeBlankApp() {
  return (
    isBlankBuild() ||
    isCapacitorNative() ||
    isElectronShell() ||
    (typeof BUILD_CONFIG !== 'undefined' && BUILD_CONFIG.isMobileEdition)
  );
}

/** While permissions load (`undefined`), keep the editor editable. */
export function isDocEditBlocked(canEdit: boolean | undefined): boolean {
  if (isNativeBlankApp()) {
    return false;
  }
  return canEdit === false;
}

/** While permissions load (`undefined`), allow opening the doc. */
export function isDocAccessDenied(canAccess: boolean | undefined): boolean {
  if (isNativeBlankApp()) {
    return false;
  }
  return canAccess === false;
}
