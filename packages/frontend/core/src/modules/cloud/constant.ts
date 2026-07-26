import { ServerDeploymentType, ServerFeature } from '@affine/graphql';

import type { ServerConfig, ServerMetadata } from './types';

/**
 * Blank: keep a stub server id `affine-cloud` so DefaultServerService
 * still resolves, but with no Payment/Copilot/OAuth and a non-used baseUrl.
 * Real sync is Supabase on local workspaces — not this server.
 */
export const BUILD_IN_SERVERS: (ServerMetadata & { config: ServerConfig })[] = [
  {
    id: 'affine-cloud',
    baseUrl: 'http://127.0.0.1:9',
    config: {
      serverName: 'Blank',
      features: [ServerFeature.LocalWorkspace],
      oauthProviders: [],
      type: ServerDeploymentType.Affine,
      credentialsRequirement: {
        password: {
          minLength: 8,
          maxLength: 32,
        },
      },
    },
  },
];

/** Blank: no official AFFiNE telemetry collector. */
export function getOfficialTelemetryEndpoint(
  _channel?: string
): string | undefined {
  return undefined;
}
