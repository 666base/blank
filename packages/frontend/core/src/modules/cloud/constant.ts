import {
  OAuthProviderType,
  ServerDeploymentType,
  ServerFeature,
} from '@blank/graphql';

import { isLocalOnlyMode } from '../../utils/local-only';
import { isBlankBuild } from '../../utils/blank-links';
import { getBlankSyncServerUrl, isBlankSyncEnabled } from '../../utils/sync-config';
import type { ServerConfig, ServerMetadata } from './types';

const LOCAL_ONLY_SERVER_FEATURES = [ServerFeature.LocalWorkspace];

const BLANK_SYNC_SERVER_FEATURES = [
  ServerFeature.Indexer,
  ServerFeature.OAuth,
];

const BLANK_CLOUD_SERVER_FEATURES = [
  ServerFeature.Indexer,
  ServerFeature.Copilot,
  ServerFeature.CopilotEmbedding,
  ServerFeature.OAuth,
  ServerFeature.Payment,
  ServerFeature.LocalWorkspace,
];

const serverCredentials = {
  password: {
    minLength: 8,
    maxLength: 32,
  },
};

/** Built-in server id: `app` in local-only fork, `blank-cloud` in cloud builds. */
export const DEFAULT_BUILTIN_SERVER_ID = isLocalOnlyMode()
  ? ('app' as const)
  : ('blank-cloud' as const);

function getLocalBuiltinBaseUrl() {
  if (typeof location !== 'undefined' && location.origin) {
    return location.origin;
  }
  return 'http://127.0.0.1:8080';
}

function localBuiltinServer(baseUrl: string) {
  return {
    id: 'app' as const,
    baseUrl,
    config: {
      serverName: 'Local',
      features: LOCAL_ONLY_SERVER_FEATURES,
      oauthProviders: [],
      type: ServerDeploymentType.Blank,
      credentialsRequirement: serverCredentials,
    },
  };
}

function blankSyncServer(baseUrl: string) {
  return {
    id: 'blank-cloud' as const,
    baseUrl,
    config: {
      serverName: 'Blank Sync',
      features: BLANK_SYNC_SERVER_FEATURES,
      oauthProviders: [],
      type: ServerDeploymentType.Selfhosted,
      credentialsRequirement: serverCredentials,
    },
  };
}

function blankCloudServer(baseUrl: string) {
  return {
    id: 'blank-cloud' as const,
    baseUrl,
    config: {
      serverName: 'Blank Cloud',
      features: BLANK_CLOUD_SERVER_FEATURES,
      oauthProviders: [OAuthProviderType.Google, OAuthProviderType.Apple],
      type: ServerDeploymentType.Blank,
      credentialsRequirement: serverCredentials,
    },
  };
}

function buildCloudServers(): (ServerMetadata & { config: ServerConfig })[] {
  if (isBlankBuild()) {
    return [];
  }

  if (environment.isSelfHosted) {
    return [
      {
        id: 'blank-cloud',
        baseUrl: location.origin,
        config: {
          serverName: 'Blank Selfhost',
          features: [],
          oauthProviders: [],
          type: ServerDeploymentType.Selfhosted,
          credentialsRequirement: serverCredentials,
        },
      },
    ];
  }

  if (BUILD_CONFIG.debug) {
    return [
      blankCloudServer(
        BUILD_CONFIG.isElectron ? 'http://localhost:8080' : location.origin
      ),
    ];
  }

  if (BUILD_CONFIG.appBuildType === 'stable') {
    return [
      blankCloudServer(
        BUILD_CONFIG.isNative
          ? BUILD_CONFIG.isIOS
            ? 'https://apple.getblankapp.com'
            : 'https://app.blank.pro'
          : location.origin
      ),
    ];
  }

  if (BUILD_CONFIG.appBuildType === 'beta') {
    return [
      blankCloudServer(
        BUILD_CONFIG.isNative
          ? BUILD_CONFIG.isIOS
            ? 'https://apple.getblankapp.com'
            : 'https://insider.blank.pro'
          : location.origin
      ),
    ];
  }

  if (BUILD_CONFIG.appBuildType === 'internal') {
    return [blankCloudServer('https://insider.blank.pro')];
  }

  if (BUILD_CONFIG.appBuildType === 'canary') {
    return [
      blankCloudServer(
        BUILD_CONFIG.isNative ? 'https://blank.fail' : location.origin
      ),
    ];
  }

  return [];
}

export const BUILD_IN_SERVERS: (ServerMetadata & { config: ServerConfig })[] =
  isLocalOnlyMode()
    ? [localBuiltinServer(getLocalBuiltinBaseUrl())]
    : isBlankSyncEnabled()
      ? [blankSyncServer(getBlankSyncServerUrl()!)]
      : (() => {
          const servers = buildCloudServers();
          return servers.length
            ? servers
            : [localBuiltinServer(getLocalBuiltinBaseUrl())];
        })();

export type TelemetryChannel =
  | 'stable'
  | 'beta'
  | 'internal'
  | 'canary'
  | 'local';

const OFFICIAL_TELEMETRY_ENDPOINTS: Record<TelemetryChannel, string> = {
  stable: 'https://app.blank.pro',
  beta: 'https://insider.blank.pro',
  internal: 'https://insider.blank.pro',
  canary: 'https://blank.fail',
  local: 'http://localhost:8080',
};

export function getOfficialTelemetryEndpoint(
  channel = BUILD_CONFIG.appBuildType
): string {
  if (isBlankBuild() || isLocalOnlyMode()) {
    return getLocalBuiltinBaseUrl();
  }

  if (BUILD_CONFIG.debug) {
    return BUILD_CONFIG.isNative
      ? OFFICIAL_TELEMETRY_ENDPOINTS.local
      : location.origin;
  } else if (['beta', 'internal', 'canary', 'stable'].includes(channel)) {
    return OFFICIAL_TELEMETRY_ENDPOINTS[channel];
  }

  return OFFICIAL_TELEMETRY_ENDPOINTS.stable;
}
