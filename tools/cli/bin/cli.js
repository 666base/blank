#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const toolsCli = join(here, '..');
const runner = join(here, 'runner.js');

// Always resolve affine.ts from @affine-tools/cli, regardless of caller cwd
const result = spawnSync(
  process.execPath,
  [runner, 'affine.ts', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: process.env,
    cwd: toolsCli,
  }
);

process.exit(result.status ?? 1);
