import { defineConfig } from 'tsup';

export default defineConfig({
  format: 'esm',
  target: 'esnext',
  bundle: false,
  clean: true,
  dts: true,
});
