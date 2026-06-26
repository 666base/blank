/**
 * Shared GitHub Releases helpers for desktop auto-update and mobile APK checks.
 */
import {
  getBlankGithubUrl,
  getBlankUpdateGithubUrl,
  getBlankUpdateReleasesUrl,
} from './blank-links';

export type BlankReleaseManifest = {
  version: string;
  tag: string;
  desktopExe: string;
  androidApk: string;
  publishedAt: string;
  releaseUrl: string;
};

export type BlankReleaseCheckResult = {
  updateAvailable: boolean;
  currentVersion: string;
  latestVersion: string | null;
  manifest: BlankReleaseManifest | null;
  apkDownloadUrl: string | null;
  desktopDownloadUrl: string | null;
  error?: string;
};

const GITHUB_API_LATEST = `${getBlankUpdateGithubUrl()}/releases/latest`;
const MANIFEST_URL = `${getBlankUpdateReleasesUrl()}/latest/download/version.json`;

function normalizeVersion(version: string) {
  return version.replace(/^v/i, '').trim();
}

export function compareVersions(latest: string, current: string) {
  const parse = (value: string) =>
    normalizeVersion(value)
      .split(/[.-]/)
      .map(part => {
        const n = Number.parseInt(part, 10);
        return Number.isFinite(n) ? n : 0;
      });

  const a = parse(latest);
  const b = parse(current);
  const length = Math.max(a.length, b.length);

  for (let i = 0; i < length; i += 1) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff > 0) {
      return 1;
    }
    if (diff < 0) {
      return -1;
    }
  }
  return 0;
}

export function isNewerVersion(latest: string, current: string) {
  return compareVersions(latest, current) > 0;
}

function assetUrl(tag: string, fileName: string) {
  return `${getBlankUpdateReleasesUrl()}/download/${tag}/${fileName}`;
}

function manifestFromReleaseJson(
  release: Record<string, unknown>
): BlankReleaseManifest | null {
  const tag = typeof release.tag_name === 'string' ? release.tag_name : '';
  const version = normalizeVersion(tag);
  if (!version) {
    return null;
  }

  const assets = Array.isArray(release.assets)
    ? (release.assets as Array<Record<string, unknown>>)
    : [];
  const names = assets
    .map(asset => (typeof asset.name === 'string' ? asset.name : ''))
    .filter(Boolean);

  const desktopExe =
    names.find(name => /^Blank-Setup-.*\.exe$/i.test(name)) ??
    `Blank-Setup-${version}.exe`;
  const androidApk =
    names.find(name => /^Blank-.*\.apk$/i.test(name)) ?? `Blank-${version}.apk`;

  return {
    version,
    tag,
    desktopExe,
    androidApk,
    publishedAt:
      typeof release.published_at === 'string' ? release.published_at : '',
    releaseUrl:
      typeof release.html_url === 'string'
        ? release.html_url
        : getBlankUpdateReleasesUrl(),
  };
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

export async function fetchBlankReleaseManifest(): Promise<BlankReleaseManifest | null> {
  try {
    const manifest = (await fetchJson(MANIFEST_URL)) as Partial<BlankReleaseManifest>;
    if (manifest?.version && manifest.tag) {
      return {
        version: normalizeVersion(manifest.version),
        tag: manifest.tag,
        desktopExe: manifest.desktopExe ?? `Blank-Setup-${manifest.version}.exe`,
        androidApk: manifest.androidApk ?? `Blank-${manifest.version}.apk`,
        publishedAt: manifest.publishedAt ?? '',
        releaseUrl: manifest.releaseUrl ?? getBlankUpdateReleasesUrl(),
      };
    }
  } catch {
    // fall through to GitHub API
  }

  const release = (await fetchJson(GITHUB_API_LATEST)) as Record<string, unknown>;
  return manifestFromReleaseJson(release);
}

export async function checkBlankAppUpdate(
  currentVersion: string
): Promise<BlankReleaseCheckResult> {
  const current = normalizeVersion(currentVersion);
  try {
    const manifest = await fetchBlankReleaseManifest();
    if (!manifest) {
      return {
        updateAvailable: false,
        currentVersion: current,
        latestVersion: null,
        manifest: null,
        apkDownloadUrl: null,
        desktopDownloadUrl: null,
        error: 'No release metadata found',
      };
    }

    const updateAvailable = isNewerVersion(manifest.version, current);
    return {
      updateAvailable,
      currentVersion: current,
      latestVersion: manifest.version,
      manifest,
      apkDownloadUrl: assetUrl(manifest.tag, manifest.androidApk),
      desktopDownloadUrl: assetUrl(manifest.tag, manifest.desktopExe),
    };
  } catch (error) {
    const raw = error instanceof Error ? error.message : String(error);
    const message = /failed to fetch/i.test(raw)
      ? 'Cannot reach the update server. Check your internet connection.'
      : raw;
    return {
      updateAvailable: false,
      currentVersion: current,
      latestVersion: null,
      manifest: null,
      apkDownloadUrl: null,
      desktopDownloadUrl: null,
      error: message,
    };
  }
}

export function openBlankReleaseDownload(url: string) {
  if (!url) {
    return;
  }
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export function getBlankReleasePageUrl() {
  return getBlankUpdateReleasesUrl();
}

export function getBlankRepositoryUrl() {
  return getBlankGithubUrl();
}
