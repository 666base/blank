import type { Configuration as RspackDevServerConfiguration } from '@rspack/dev-server';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'node:net';

export const RSPACK_SUPPORTED_PACKAGES = [
  '@affine/web',
  '@affine/mobile',
  '@affine/reader',
  '@affine/media-capture-playground',
] as const;

const rspackSupportedPackageSet = new Set<string>(RSPACK_SUPPORTED_PACKAGES);

export function isRspackSupportedPackageName(name: string) {
  return rspackSupportedPackageSet.has(name);
}

export function assertRspackSupportedPackageName(name: string) {
  if (isRspackSupportedPackageName(name)) {
    return;
  }

  throw new Error(
    `Rspack bundling currently supports: ${Array.from(RSPACK_SUPPORTED_PACKAGES).join(', ')}. Unsupported package: ${name}.`
  );
}

/** Default dev ports per frontend app (web + mobile can run side by side). */
export const DEFAULT_DEV_SERVER_PORTS: Record<string, number> = {
  '@affine/web': 8080,
  '@affine/mobile': 8081,
};

export function getDefaultDevServerPort(packageName: string) {
  return DEFAULT_DEV_SERVER_PORTS[packageName] ?? 8080;
}

export function getPreferredDevServerPort(packageName: string) {
  const packageDefault = getDefaultDevServerPort(packageName);

  if (process.env.AFFINE_DESKTOP_URL) {
    const url = new URL(process.env.AFFINE_DESKTOP_URL);
    return Number(url.port || packageDefault);
  }

  if (process.env.PORT) {
    const envPort = Number(process.env.PORT);
    if (
      packageName === '@affine/mobile' &&
      envPort === 8080 &&
      packageDefault !== 8080
    ) {
      return packageDefault;
    }
    return envPort;
  }

  return packageDefault;
}

export async function isDevServerPortFree(port: number) {
  return new Promise<boolean>(resolve => {
    const server = createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '0.0.0.0');
  });
}

export async function resolveDevServerPort(
  preferredPort: number,
  maxAttempts = 20
) {
  for (let offset = 0; offset < maxAttempts; offset++) {
    const port = preferredPort + offset;
    if (await isDevServerPortFree(port)) {
      return port;
    }
  }
  throw new Error(
    `No free dev server port in range ${preferredPort}-${preferredPort + maxAttempts - 1}. Stop other dev servers and retry.`
  );
}

export function createDevServerConfig(port: number): RspackDevServerConfiguration {
  return {
    host: '0.0.0.0',
    port,
    allowedHosts: 'all',
    hot: false,
    liveReload: true,
    compress: !process.env.CI,
    setupExitSignals: true,
    client: {
      overlay: process.env.DISABLE_DEV_OVERLAY === 'true' ? false : undefined,
      logging: process.env.CI ? 'none' : 'error',
      // see: https://webpack.js.org/configuration/dev-server/#websocketurl
      // must be an explicit ws/wss URL because custom protocols (e.g. assets://)
      // cannot be used to construct WebSocket endpoints in Electron
      webSocketURL: `ws://0.0.0.0:${port}/ws`,
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: () => {
            return process.env.SELF_HOSTED === 'true'
              ? '/selfhost.html'
              : '/index.html';
          },
        },
      ],
    },
    proxy:
      process.env.AFFINE_ENABLE_BACKEND_PROXY === 'true'
        ? [
            {
              context: '/api',
              target: 'http://localhost:3010',
            },
            {
              context: '/socket.io',
              target: 'http://localhost:3010',
              ws: true,
            },
            {
              context: '/graphql',
              target: 'http://localhost:3010',
            },
          ]
        : [],
  };
}

export const DEFAULT_DEV_SERVER_CONFIG: RspackDevServerConfiguration =
  createDevServerConfig(Number(process.env.PORT ?? 8080));

export function getElectronDevServerInfoPath() {
  return join(process.cwd(), '.blank', 'electron-dev-server.json');
}

export function writeElectronDevServerInfo(port: number) {
  if (process.env.AFFINE_ELECTRON_DEV !== '1') {
    return;
  }
  const dir = join(process.cwd(), '.blank');
  mkdirSync(dir, { recursive: true });
  const url = `http://127.0.0.1:${port}`;
  writeFileSync(
    getElectronDevServerInfoPath(),
    JSON.stringify({ port, url, pid: process.pid, at: Date.now() }),
    'utf8'
  );
}
