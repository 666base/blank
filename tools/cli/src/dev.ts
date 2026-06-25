import type { PackageName } from '@affine-tools/utils/workspace';

import { getDefaultDevServerPort } from './bundle-shared';
import { Option, PackageSelectorCommand } from './command';

export class DevCommand extends PackageSelectorCommand {
  static override paths = [['dev'], ['d']];

  protected override availablePackages: PackageName[] = [
    '@affine/web',
    '@affine/mobile',
  ];

  protected deps = Option.Boolean('--deps', {
    description: 'Run dev with dependencies',
  });

  async execute() {
    const name = await this.getPackage();
    const args = [];

    // Each app has its own default port so web (8080) and mobile (8081) can run together.
    process.env.PORT = String(getDefaultDevServerPort(name));

    if (this.deps) {
      args.push('--deps');
    }

    args.push(name, 'dev');

    await this.cli.run(args);
  }
}
