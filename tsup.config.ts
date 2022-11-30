import { defineConfig } from 'tsup';

export default defineConfig({
  format: 'esm',
  target: 'esnext',
  skipNodeModulesBundle: true,
  clean: true,
  dts: true,
});
