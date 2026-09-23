import { defineConfig } from 'tsup';

/** CSS Modules are compiled by esbuild and emitted as one stylesheet at `./styles.css`. */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@lucasfeitosatech/design-core', '@lucasfeitosatech/design-tokens'],
});
