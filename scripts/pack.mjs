/**
 * Builds every package and packs it into `dist-packages/`, the stable place consumers point at
 * while there is no registry. `/tmp` is not that place: it is cleared, and a missing tarball turns
 * into an install error in an app that was working yesterday.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('dist-packages');
const PACKAGES = ['tokens', 'core', 'react', 'react-native'];

const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit' });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

run('npm', ['run', 'build'], process.cwd());
for (const name of PACKAGES) {
  run('npm', ['pack', '--pack-destination', OUT, '--loglevel', 'error'], path.join('packages', name));
}

console.log(`\npacked into dist-packages/:`);
for (const file of readdirSync(OUT).sort()) console.log(`  ${file}`);
