import { appNames } from './channel';

export const BLANK_GITHUB_URL = 'https://github.com/666base/blank';
export const BLANK_RELEASES_URL = 'https://github.com/666base/blank/releases';

export function isBlankBuild() {
  if (typeof BUILD_CONFIG === 'undefined') {
    return true;
  }
  return appNames[BUILD_CONFIG.appBuildType] === 'Blank';
}

export function getBlankDownloadUrl() {
  return BUILD_CONFIG.downloadUrl || BLANK_RELEASES_URL;
}

export function getBlankGithubUrl() {
  return BUILD_CONFIG.githubUrl || BLANK_GITHUB_URL;
}

/** Default local workspace title for Blank builds. */
export function getDefaultWorkspaceName() {
  return isBlankBuild() ? 'My Notes' : 'Demo Workspace';
}

export function getBlankChangelogUrl() {
  return BUILD_CONFIG.changelogUrl || BLANK_RELEASES_URL;
}
