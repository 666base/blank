import type { PackageName } from '@affine-tools/utils/workspace';
import inquirer from 'inquirer';

import { Option, PackageSelectorCommand } from './command';

type BlankDevTarget = {
  /** Shown in the prompt — product name, not @affine/* */
  label: string;
  package: PackageName;
  script: string;
};

const BLANK_DEV_TARGETS: BlankDevTarget[] = [
  {
    label: 'Blank Desktop',
    package: '@affine/tauri',
    script: 'dev',
  },
  {
    label: 'Blank Phone (Android)',
    package: '@affine/tauri',
    script: 'android:dev',
  },
];

/**
 * Blank product only: desktop (Tauri) + phone (Tauri Android).
 * Electron / Capacitor / admin / iOS are not offered.
 */
export class DevCommand extends PackageSelectorCommand {
  static override paths = [['dev'], ['d']];

  protected override availablePackages: PackageName[] = [
    '@affine/tauri',
    '@affine/web',
  ];

  protected deps = Option.Boolean('--deps', {
    description: 'Run dev with dependencies',
  });

  async execute() {
    const target = await this.getBlankTarget();
    const args: string[] = [];

    if (this.deps) {
      args.push('--deps');
    }

    args.push(target.package, target.script);
    await this.cli.run(args);
  }

  private async getBlankTarget(): Promise<BlankDevTarget> {
    const raw = this.packageNameOrAlias?.trim();

    if (raw) {
      const key = raw.toLowerCase();
      if (
        key === 'phone' ||
        key === 'android' ||
        key === 'mobile' ||
        key === 'blank-phone'
      ) {
        return BLANK_DEV_TARGETS[1];
      }
      if (
        key === 'desktop' ||
        key === 'tauri' ||
        key === '@affine/tauri' ||
        key === 'blank' ||
        key === 'blank-desktop'
      ) {
        return BLANK_DEV_TARGETS[0];
      }
      if (key === 'web' || key === '@affine/web' || key === 'browser') {
        // Escape hatch: browser-only UI without Tauri window
        return {
          label: 'Blank Web (browser)',
          package: '@affine/web',
          script: 'dev',
        };
      }

      throw new Error(
        `Unknown Blank target "${raw}". Use: desktop | phone | web`
      );
    }

    const answer = await inquirer.prompt<{ target: string }>([
      {
        type: 'list',
        name: 'target',
        message: 'What do you want to run?',
        choices: BLANK_DEV_TARGETS.map(t => ({
          name: t.label,
          value: t.label,
        })),
        default: BLANK_DEV_TARGETS[0].label,
      },
    ]);

    const picked = BLANK_DEV_TARGETS.find(t => t.label === answer.target);
    if (!picked) {
      throw new Error('No Blank target selected');
    }
    return picked;
  }
}
