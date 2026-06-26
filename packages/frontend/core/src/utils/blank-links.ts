import { appNames } from './channel';

export const BLANK_GITHUB_URL = 'https://github.com/666base/blank';
export const BLANK_RELEASES_URL = 'https://github.com/666base/blank/releases';

/** Public repo for EXE/APK + auto-update metadata (source repo may stay private). */
export const BLANK_UPDATE_REPO = '666base/blank-releases';
export const BLANK_UPDATE_GITHUB_URL = `https://github.com/${BLANK_UPDATE_REPO}`;
export const BLANK_UPDATE_RELEASES_URL = `${BLANK_UPDATE_GITHUB_URL}/releases`;

export function isBlankBuild() {
  if (typeof BUILD_CONFIG === 'undefined') {
    return true;
  }
  return appNames[BUILD_CONFIG.appBuildType] === 'Blank';
}

export function getBlankDownloadUrl() {
  return getBlankUpdateReleasesUrl();
}

export function getBlankGithubUrl() {
  return BUILD_CONFIG.githubUrl || BLANK_GITHUB_URL;
}

/** Always `https://github.com/{owner}/{repo}/releases` (BUILD_CONFIG may omit `/releases`). */
export function getBlankUpdateReleasesUrl() {
  const raw = (BUILD_CONFIG.downloadUrl || BLANK_UPDATE_RELEASES_URL).replace(
    /\/$/,
    ''
  );
  if (raw.endsWith('/releases')) {
    return raw;
  }
  if (/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(raw)) {
    return `${raw}/releases`;
  }
  return raw;
}

export function getBlankUpdateGithubUrl() {
  return getBlankUpdateReleasesUrl().replace(/\/releases\/?$/, '');
}

/** Default local workspace title for Blank builds. */
export function getDefaultWorkspaceName() {
  return isBlankBuild() ? 'My Notes' : 'Demo Workspace';
}

export function getBlankChangelogUrl() {
  return BUILD_CONFIG.changelogUrl || BLANK_RELEASES_URL;
}
