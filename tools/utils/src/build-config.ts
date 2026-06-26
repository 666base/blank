import type { Package } from '@blank-tools/utils/workspace';

import { PackageToDistribution } from './distribution';

export interface BuildFlags {
  channel: 'stable' | 'beta' | 'internal' | 'canary';
  mode: 'development' | 'production';
}

export function getBuildConfig(
  pkg: Package,
  buildFlags: BuildFlags
): BUILD_CONFIG_TYPE {
  const distribution = PackageToDistribution.get(pkg.name);

  if (!distribution) {
    throw new Error(`Distribution for ${pkg.name} is not found`);
  }

  const buildPreset: Record<BuildFlags['channel'], BUILD_CONFIG_TYPE> = {
    get stable() {
      return {
        debug: buildFlags.mode === 'development',
        distribution,
        isDesktopEdition: (
          ['web', 'desktop'] as BUILD_CONFIG_TYPE['distribution'][]
        ).includes(distribution),
        isMobileEdition: (
          ['mobile', 'ios', 'android'] as BUILD_CONFIG_TYPE['distribution'][]
        ).includes(distribution),
        isElectron: distribution === 'desktop',
        isWeb: distribution === 'web',
        isMobileWeb: distribution === 'mobile',
        isIOS: distribution === 'ios',
        isAndroid: distribution === 'android',
        isNative:
          distribution === 'desktop' ||
          distribution === 'ios' ||
          distribution === 'android',
        appBuildType: 'stable' as const,
        appVersion: pkg.version,
        // editorVersion: pkg.dependencies['@blocksuite/blank'],
        editorVersion: pkg.version,
        githubUrl: 'https://github.com/666base/blank',
        changelogUrl: 'https://github.com/666base/blank/releases',
        downloadUrl: 'https://github.com/666base/blank-releases/releases',
        pricingUrl: '',
        discordUrl: '',
        requestLicenseUrl: '',
        imageProxyUrl: '',
        linkPreviewUrl: '',
        CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY ?? '',
        SENTRY_DSN: process.env.SENTRY_DSN ?? '',
        blankSyncServerUrl: process.env.BLANK_SYNC_SERVER_URL ?? '',
        blankSupabaseUrl: process.env.BLANK_SUPABASE_URL ?? '',
        blankSupabaseAnonKey: process.env.BLANK_SUPABASE_ANON_KEY ?? '',
        blankConfigProxyUrl:
          process.env.BLANK_CONFIG_PROXY_URL ?? 'http://127.0.0.1:3020',
      };
    },
    get beta() {
      return {
        ...this.stable,
        appBuildType: 'beta' as const,
        changelogUrl: '',
      };
    },
    get internal() {
      return {
        ...this.stable,
        appBuildType: 'internal' as const,
        changelogUrl: '',
      };
    },
    // canary will be aggressive and enable all features
    get canary() {
      return {
        ...this.stable,
        appBuildType: 'canary' as const,
        changelogUrl: '',
      };
    },
  };

  const currentBuild = buildFlags.channel;

  if (!(currentBuild in buildPreset)) {
    throw new Error(`BUILD_TYPE ${currentBuild} is not supported`);
  }

  const currentBuildPreset = buildPreset[currentBuild];

  const environmentPreset = {
    changelogUrl: process.env.CHANGELOG_URL ?? currentBuildPreset.changelogUrl,
  };

  return {
    ...currentBuildPreset,
    // environment preset will overwrite current build preset
    // this environment variable is for debug proposes only
    // do not put them into CI
    ...(process.env.CI ? {} : environmentPreset),
  };
}
