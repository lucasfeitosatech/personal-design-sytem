/**
 * Installs the packed tarballs into a consuming app.
 *
 *   node scripts/install-into.mjs ../personal-ai-planner/web
 *
 * Copies the tarballs the app's surface needs into `<app>/design-system/` and installs from there,
 * so the dependency path is inside the app and survives a clone: the deploy on the server needs the
 * app repository and nothing else. Not `vendor/`, which a React Native project already uses for its
 * Ruby gems.
 *
 * The installed folder is removed first on purpose. npm resolves a `file:` dependency by path and
 * version, so re-installing a rebuilt tarball whose version did not change can silently keep the
 * previous contents — the exact trap that makes a fix look like it did not work.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const app = process.argv[2];
if (!app) {
  console.error('usage: node scripts/install-into.mjs <path-to-app>');
  process.exit(1);
}

const appDir = path.resolve(app);
const packed = path.resolve('dist-packages');
if (!existsSync(packed)) {
  console.error('dist-packages/ is missing. Run `npm run pack:all` first.');
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(path.join(appDir, 'package.json'), 'utf8'));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
const isNative = 'react-native' in deps;
const wanted = ['design-tokens', 'design-core', isNative ? 'components-react-native' : 'components-react'];

const vendor = path.join(appDir, 'design-system');
mkdirSync(vendor, { recursive: true });

const files = readdirSync(packed);
const targets = wanted.map((name) => {
  const file = files.find((f) => f.startsWith(`lucasfeitosatech-${name}-`));
  if (!file) throw new Error(`no tarball for ${name} in dist-packages/`);
  copyFileSync(path.join(packed, file), path.join(vendor, file));
  // `./` is required: npm reads a bare `a/b` argument as a GitHub shorthand, not a path.
  return `./design-system/${file}`;
});

rmSync(path.join(appDir, 'node_modules', '@lucasfeitosatech'), { recursive: true, force: true });
execFileSync('npm', ['install', '--no-audit', '--no-fund', '--loglevel', 'error', ...targets], { cwd: appDir, stdio: 'inherit' });

console.log(`\ninstalled into ${path.relative(process.cwd(), appDir)} (${isNative ? 'native' : 'web'} surface):`);
for (const t of targets) console.log(`  ${t}`);
