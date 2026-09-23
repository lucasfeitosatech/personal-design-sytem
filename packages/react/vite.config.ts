import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/**
 * Vite instead of tsup: this package ships CSS Modules, and tsup routes CSS through its own
 * pipeline, emitting the classes globally with no mapping. The result builds and typechecks but
 * renders unstyled, because every `styles.x` is undefined and `.label`, `.md` and `.invalid`
 * collide across components. Vite compiles the modules, hashes the names and emits one stylesheet.
 */
export default defineConfig({
  // No React plugin: Fast Refresh is a dev concern, and Vite already applies the automatic JSX
  // runtime from tsconfig for a library build.
  plugins: [dts({ include: ['src'], exclude: ['src/**/*.test.tsx'], rollupTypes: true })],
  css: {
    modules: {
      // Readable in devtools, unique across the package.
      generateScopedName: 'ds-[local]-[hash:base64:5]',
    },
  },
  build: {
    lib: { entry: 'src/index.ts', formats: ['es', 'cjs'], fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs') },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@lucasfeitosatech/design-core', '@lucasfeitosatech/design-tokens'],
      output: { assetFileNames: 'index.css' },
    },
  },
});
