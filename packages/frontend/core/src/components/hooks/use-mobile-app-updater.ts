import { useCallback, useEffect, useState } from 'react';

import { isCapacitorNative } from '../../utils/local-only';
import {
  checkBlankAppUpdate,
} from '../../utils/blank-github-release';
import { nativeFetch } from '../../utils/native-http';

type MobileUpdateStatus =
  | 'idle'
  | 'checking'
  | 'latest'
  | 'available'
  | 'downloading'
  | 'download-ready'
  | 'error';

function formatDownloadError(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error);
  if (/failed to fetch|network request failed|network error/i.test(raw)) {
    return 'Cannot download the update. Check your internet connection and try again.';
  }
  return raw;
}

async function installDownloadedApk(fileUri: string) {
  const { FileOpener } = await import('@capacitor-community/file-opener');
  await FileOpener.open({
    filePath: fileUri,
    contentType: 'application/vnd.android.package-archive',
  });
}

async function downloadApkNative(
  url: string,
  fileName: string,
  onProgress: (percent: number) => void
) {
  const { FileTransfer } = await import('@capacitor/file-transfer');
  const { Filesystem, Directory } = await import('@capacitor/filesystem');

  await Filesystem.mkdir({
    path: 'updates',
    directory: Directory.Cache,
    recursive: true,
  });

  const target = await Filesystem.getUri({
    directory: Directory.Cache,
    path: `updates/${fileName}`,
  });

  const progressListener = await FileTransfer.addListener(
    'progress',
    event => {
      if (event.url !== url || !event.total) {
        return;
      }
      onProgress(Math.min(100, (event.loaded / event.total) * 100));
    }
  );

  try {
    await FileTransfer.downloadFile({
      url,
      path: target.uri,
      progress: true,
    });
    onProgress(100);
    return target.uri;
  } finally {
    await progressListener.remove();
  }
}

async function downloadApkInApp(
  url: string,
  fileName: string,
  onProgress: (percent: number) => void
) {
  if (isCapacitorNative() && BUILD_CONFIG.isAndroid) {
    const fileUri = await downloadApkNative(url, fileName, onProgress);
    await installDownloadedApk(fileUri);
    return;
  }

  const response = await nativeFetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const total = Number(response.headers.get('content-length')) || 0;
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Download stream unavailable');
  }

  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (value) {
      chunks.push(value);
      received += value.length;
      if (total > 0) {
        onProgress(Math.min(100, (received / total) * 100));
      }
    }
  }

  const blob = new Blob(chunks, {
    type: 'application/vnd.android.package-archive',
  });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.style.display = 'none';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  onProgress(100);
}

export function useMobileAppUpdater() {
  const [status, setStatus] = useState<MobileUpdateStatus>('idle');
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdates = useCallback(async () => {
    setStatus('checking');
    setError(null);
    setDownloadProgress(null);
    const result = await checkBlankAppUpdate(BUILD_CONFIG.appVersion);
    if (result.error) {
      setStatus('error');
      setError(result.error);
      return result;
    }
    setLatestVersion(result.latestVersion);
    setDownloadUrl(result.apkDownloadUrl);
    setStatus(result.updateAvailable ? 'available' : 'latest');
    return result;
  }, []);

  const downloadUpdate = useCallback(async () => {
    if (!downloadUrl || !latestVersion) {
      return;
    }
    setStatus('downloading');
    setDownloadProgress(0);
    setError(null);
    try {
      await downloadApkInApp(
        downloadUrl,
        `Blank-${latestVersion}.apk`,
        setDownloadProgress
      );
      setStatus('download-ready');
    } catch (err) {
      setStatus('error');
      setError(formatDownloadError(err));
      setDownloadProgress(null);
    }
  }, [downloadUrl, latestVersion]);

  useEffect(() => {
    if (!BUILD_CONFIG.isMobileEdition || BUILD_CONFIG.isIOS) {
      return;
    }
    const timer = window.setTimeout(() => {
      void checkForUpdates();
    }, 12_000);
    return () => window.clearTimeout(timer);
  }, [checkForUpdates]);

  return {
    status,
    latestVersion,
    downloadUrl,
    downloadProgress,
    error,
    checkForUpdates,
    downloadUpdate,
  };
}
