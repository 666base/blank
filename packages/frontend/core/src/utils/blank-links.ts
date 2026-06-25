import { appNames } from './channel';

export const BLANK_GITHUB_URL = 'https://github.com/666base/blank';
export const BLANK_RELEASES_URL = 'https://github.com/666base/blank/releases';

export function isBlankBuild() {
  return appNames[BUILD_CONFIG.appBuildType] === 'Blank';
}

export function getBlankDownloadUrl() {
  return BUILD_CONFIG.downloadUrl || BLANK_RELEASES_URL;
}

export function getBlankGithubUrl() {
  return BUILD_CONFIG.githubUrl || BLANK_GITHUB_URL;
}

export function getBlankChangelogUrl() {
  return BUILD_CONFIG.changelogUrl || BLANK_RELEASES_URL;
}
