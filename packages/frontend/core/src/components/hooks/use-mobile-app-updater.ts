import { useCallback, useEffect, useState } from 'react';

import {
  checkBlankAppUpdate,
  openBlankReleaseDownload,
} from '../../utils/blank-github-release';

type MobileUpdateStatus =
  | 'idle'
  | 'checking'
  | 'latest'
  | 'available'
  | 'error';

export function useMobileAppUpdater() {
  const [status, setStatus] = useState<MobileUpdateStatus>('idle');
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdates = useCallback(async () => {
    setStatus('checking');
    setError(null);
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

  const downloadUpdate = useCallback(() => {
    if (downloadUrl) {
      openBlankReleaseDownload(downloadUrl);
    }
  }, [downloadUrl]);

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
    error,
    checkForUpdates,
    downloadUpdate,
  };
}
