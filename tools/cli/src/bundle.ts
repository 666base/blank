import { rmSync } from 'node:fs';
import { cpus } from 'node:os';

import { Logger } from '@blank-tools/utils/logger';
import { Package } from '@blank-tools/utils/workspace';
import rspack, { type MultiRspackOptions } from '@rspack/core';
import {
  type Configuration as RspackDevServerConfiguration,
  RspackDevServer,
} from '@rspack/dev-server';
import { merge } from 'lodash-es';

import {
  assertRspackSupportedPackageName,
  createDevServerConfig,
  getPreferredDevServerPort,
  resolveDevServerPort,
  writeElectronDevServerInfo,
} from './bundle-shared';
import { Option, PackageCommand } from './command';
import {
  createHTMLTargetConfig as createRspackHTMLTargetConfig,
  createNodeTargetConfig as createRspackNodeTargetConfig,
  createWorkerTargetConfig as createRspackWorkerTargetConfig,
} from './rspack';
import {
  shouldUploadReleaseAssets,
  uploadDistAssetsToS3,
} from './rspack-shared/s3-plugin.js';

type WorkerConfig = { name: string };
type CreateWorkerTargetConfig = (pkg: Package, entry: string) => WorkerConfig;
type BaseWorkerOptions = {
  includeMermaidAndTypst?: boolean;
  includePdf?: boolean;
};

const BLANK_SLIM_WORKERS: BaseWorkerOptions = {
  includeMermaidAndTypst: false,
  includePdf: false,
};

const BLANK_SLIM_PACKAGES = new Set([
  '@blank/web',
  '@blank/mobile',
  '@blank/electron-renderer',
  '@blank/ios',
  '@blank/android',
]);

function ensureBlankBundleSlimEnv(pkg: Package) {
  if (!BLANK_SLIM_PACKAGES.has(pkg.name)) {
    return;
  }
  if (process.env.BLANK_NO_AI === undefined) {
    process.env.BLANK_NO_AI = '1';
  }
}

function assertRspackSupportedPackage(pkg: Package) {
  assertRspackSupportedPackageName(pkg.name);
}

function shouldUploadAssetsForPackage(pkg: Package): boolean {
  return (
    !!process.env.R2_SECRET_ACCESS_KEY && shouldUploadReleaseAssets(pkg.name)
  );
}

async function uploadAssetsForPackage(pkg: Package, logger: Logger) {
  if (!shouldUploadAssetsForPackage(pkg)) {
    return;
  }
  logger.info('Uploading dist assets to R2...');
  await uploadDistAssetsToS3(pkg.distPath.value);
  logger.info('Uploaded dist assets to R2.');
}

function getBaseWorkerConfigs(
  pkg: Package,
  createWorkerTargetConfig: CreateWorkerTargetConfig,
  options: BaseWorkerOptions = {}
) {
  const core = new Package('@blank/core');
  const includeMermaidAndTypst = options.includeMermaidAndTypst ?? true;
  const includePdf = options.includePdf ?? true;

  const workerConfigs = [
    createWorkerTargetConfig(
      pkg,
      core.srcPath.join(
        'modules/workspace-engine/impls/workspace-profile.worker.ts'
      ).value
    ),
    createWorkerTargetConfig(
      pkg,
      core.srcPath.join(
        'blocksuite/view-extensions/turbo-renderer/turbo-painter.worker.ts'
      ).value
    ),
  ];

  if (includePdf) {
    workerConfigs.splice(
      1,
      0,
      createWorkerTargetConfig(
        pkg,
        core.srcPath.join('modules/pdf/renderer/pdf.worker.ts').value
      )
    );
  }

  if (includeMermaidAndTypst) {
    workerConfigs.push(
      createWorkerTargetConfig(
        pkg,
        core.srcPath.join('modules/mermaid/renderer/mermaid.worker.ts').value
      ),
      createWorkerTargetConfig(
        pkg,
        core.srcPath.join('modules/typst/renderer/typst.worker.ts').value
      )
    );
  }

  return workerConfigs;
}

function getRspackBundleConfigs(pkg: Package): MultiRspackOptions {
  assertRspackSupportedPackage(pkg);

  switch (pkg.name) {
    case '@blank/web':
    case '@blank/mobile': {
      const workerConfigs = getBaseWorkerConfigs(
        pkg,
        createRspackWorkerTargetConfig,
        BLANK_SLIM_WORKERS
      );
      workerConfigs.push(
        createRspackWorkerTargetConfig(
          pkg,
          pkg.srcPath.join('nbstore.worker.ts').value
        )
      );

      return [
        createRspackHTMLTargetConfig(
          pkg,
          pkg.srcPath.join('index.tsx').value,
          {},
          workerConfigs.map(config => config.name)
        ),
        ...workerConfigs,
      ] as MultiRspackOptions;
    }
    case '@blank/ios':
    case '@blank/android': {
      const workerConfigs = getBaseWorkerConfigs(
        pkg,
        createRspackWorkerTargetConfig,
        BLANK_SLIM_WORKERS
      );
      workerConfigs.push(
        createRspackWorkerTargetConfig(
          pkg,
          pkg.srcPath.join('nbstore.worker.ts').value
        )
      );

      return [
        createRspackHTMLTargetConfig(
          pkg,
          pkg.srcPath.join('index.tsx').value,
          {},
          workerConfigs.map(config => config.name)
        ),
        ...workerConfigs,
      ] as MultiRspackOptions;
    }
    case '@blank/electron-renderer': {
      const workerConfigs = getBaseWorkerConfigs(
        pkg,
        createRspackWorkerTargetConfig,
        BLANK_SLIM_WORKERS
      );

      return [
        createRspackHTMLTargetConfig(
          pkg,
          {
            index: pkg.srcPath.join('app/index.tsx').value,
            shell: pkg.srcPath.join('shell/index.tsx').value,
            popup: pkg.srcPath.join('popup/index.tsx').value,
            backgroundWorker: pkg.srcPath.join('background-worker/index.ts')
              .value,
          },
          {
            additionalEntryForSelfhost: false,
            injectGlobalErrorHandler: false,
            emitAssetsManifest: false,
          },
          workerConfigs.map(config => config.name)
        ),
        ...workerConfigs,
      ] as MultiRspackOptions;
    }
    case '@blank/server': {
      return [
        createRspackNodeTargetConfig(pkg, pkg.srcPath.join('index.ts').value),
      ] as MultiRspackOptions;
    }
    case '@blank/reader': {
      return [
        createRspackNodeTargetConfig(pkg, pkg.srcPath.join('index.ts').value, {
          outputFilename: 'index.js',
          decoratorVersion: '2022-03',
          libraryType: 'module',
          bundleAllDependencies: true,
          forceExternal: ['yjs'],
        }),
      ] as MultiRspackOptions;
    }
    case '@blank/media-capture-playground': {
      return [
        createRspackHTMLTargetConfig(pkg, pkg.join('web/main.tsx').value, {
          template: pkg.join('web/index.html').value,
          additionalEntryForSelfhost: false,
          copySharedPublicAssets: false,
          injectGlobalErrorHandler: false,
          emitAssetsManifest: false,
        }),
      ] as MultiRspackOptions;
    }
  }

  throw new Error(`Unsupported package: ${pkg.name}`);
}

function getRspackDevServerConfig(
  pkg: Package
): RspackDevServerConfiguration | undefined {
  if (pkg.name !== '@blank/media-capture-playground') {
    return;
  }

  return {
    proxy: [
      {
        context: '/api',
        target: 'http://localhost:6544',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    ],
  };
}

function isElectronMainWebBundleReady(stats: {
  hasErrors: () => boolean;
  compilation?: { name?: string; getAssets?: () => { name: string }[] };
  stats?: {
    hasErrors: () => boolean;
    compilation?: { name?: string; getAssets?: () => { name: string }[] };
  }[];
}) {
  const statList = stats.stats?.length ? stats.stats : [stats];

  return statList.some(child => {
    if (child.hasErrors()) {
      return false;
    }

    const compilationName = child.compilation?.name ?? '';
    if (/apps[\\/]web[\\/]src[\\/]index\.tsx/.test(compilationName)) {
      return true;
    }

    const assets = child.compilation?.getAssets?.() ?? [];
    return assets.some(asset => asset.name === 'index.html');
  });
}

export class BundleCommand extends PackageCommand {
  static override paths = [['bundle'], ['pack'], ['bun']];

  // bundle is not able to run with deps
  override _deps = false;
  override waitDeps = false;

  dev = Option.Boolean('--dev,-d', false, {
    description: 'Run in Development mode',
  });

  async execute() {
    const pkg = this.workspace.getPackage(this.package);

    if (this.dev) {
      await BundleCommand.dev(pkg, getRspackDevServerConfig(pkg));
    } else {
      await BundleCommand.build(pkg);
    }
  }

  static async build(pkg: Package) {
    return BundleCommand.buildWithRspack(pkg);
  }

  static async dev(
    pkg: Package,
    devServerConfig?: RspackDevServerConfiguration
  ) {
    return BundleCommand.devWithRspack(pkg, devServerConfig);
  }

  static async buildWithRspack(pkg: Package) {
    process.env.NODE_ENV = 'production';
    assertRspackSupportedPackage(pkg);
    ensureBlankBundleSlimEnv(pkg);

    const logger = new Logger('bundle');
    logger.info(`Packing package ${pkg.name} with rspack...`);
    logger.info('Cleaning old output...');
    rmSync(pkg.distPath.value, { recursive: true, force: true });

    const config = getRspackBundleConfigs(pkg);
    config.parallelism = cpus().length;

    const compiler = rspack(config);
    if (!compiler) {
      throw new Error('Failed to create rspack compiler');
    }

    try {
      const stats = await new Promise<any>((resolve, reject) => {
        compiler.run((error, stats) => {
          if (error) {
            reject(error);
            return;
          }
          if (!stats) {
            reject(new Error('Failed to get rspack stats'));
            return;
          }
          resolve(stats);
        });
      });
      if (stats.hasErrors()) {
        console.error(stats.toString('errors-only'));
        process.exit(1);
        return;
      }
      console.log(stats.toString('minimal'));
      await uploadAssetsForPackage(pkg, logger);
    } catch (error) {
      console.error(error);
      process.exit(1);
      return;
    }
  }

  static async devWithRspack(
    pkg: Package,
    devServerConfig?: RspackDevServerConfiguration
  ) {
    process.env.NODE_ENV = 'development';
    assertRspackSupportedPackage(pkg);
    ensureBlankBundleSlimEnv(pkg);

    const logger = new Logger('bundle');
    logger.info(`Starting rspack dev server for ${pkg.name}...`);

    const config = getRspackBundleConfigs(pkg);
    config.parallelism = cpus().length;

    const compiler = rspack(config);
    if (!compiler) {
      throw new Error('Failed to create rspack compiler');
    }

    const isElectronDev = process.env.BLANK_ELECTRON_DEV === '1';

    const startDevServer = async (port: number) => {
      process.env.PORT = String(port);

      const serverConfig = merge(
        {},
        createDevServerConfig(port),
        devServerConfig
      );
      if (devServerConfig?.proxy) {
        serverConfig.proxy = devServerConfig.proxy;
      }

      let wroteElectronInfo = false;
      if (isElectronDev) {
        compiler.hooks.done.tap('blank-electron-dev-ready', stats => {
          if (wroteElectronInfo || stats.hasErrors()) {
            return;
          }
          if (!isElectronMainWebBundleReady(stats)) {
            return;
          }
          wroteElectronInfo = true;
          writeElectronDevServerInfo(port);
          logger.info(
            `Electron dev server ready at http://127.0.0.1:${port}`
          );
        });
      }

      const devServer = new RspackDevServer(serverConfig, compiler);
      await devServer.start();
      return port;
    };

    if (isElectronDev) {
      const port = Number(process.env.PORT);
      if (!port) {
        throw new Error('BLANK_ELECTRON_DEV requires PORT to be set');
      }
      try {
        await startDevServer(port);
      } catch (error) {
        const code =
          error && typeof error === 'object' && 'code' in error
            ? String(error.code)
            : '';
        if (code === 'EADDRINUSE') {
          throw new Error(
            `Port ${port} is already in use. Stop other dev servers, then run npm run electron:dev again.`
          );
        }
        throw error;
      }
      return;
    }

    const preferredPort = getPreferredDevServerPort(pkg.name);
    let port = preferredPort;

    for (let attempt = 0; attempt < 20; attempt++) {
      port = await resolveDevServerPort(preferredPort + attempt);

      try {
        await startDevServer(port);
        if (port !== preferredPort) {
          logger.warn(
            `Port ${preferredPort} is busy, dev server is running at http://localhost:${port}`
          );
        }
        return;
      } catch (error) {
        const code =
          error && typeof error === 'object' && 'code' in error
            ? String(error.code)
            : '';
        if (code === 'EADDRINUSE') {
          logger.warn(`Port ${port} is busy, trying another port...`);
          continue;
        }
        throw error;
      }
    }

    throw new Error(
      `No free dev server port near ${preferredPort}. Stop other dev servers and retry.`
    );
  }
}
