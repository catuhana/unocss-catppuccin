#!/usr/bin/env -S deno run -A

import { build, emptyDir } from '@deno/dnt';

import denoConfig from '../deno.json' with { type: 'json' };

await emptyDir('npm/');

await build({
  entryPoints: ['src/index.ts'],
  importMap: 'deno.json',
  outDir: 'npm/',
  shims: {
    deno: 'dev',
  },
  compilerOptions: {
    lib: ['ESNext'],
    target: 'ES2022',
  },
  scriptModule: false,
  package: {
    name: 'unocss-catppuccin',
    author: 'tuhana <npm@tuhana.me> (https://tuhana.me)',
    version: denoConfig.version,
    license: 'MPL-2.0',
    repository: {
      type: 'git',
      url: 'git+https://github.com/catuhana/unocss-catppuccin.git',
    },
    description: '🌸 Soothing pastel theme preset for UnoCSS!',
    keywords: [
      'unocss',
      'theme',
      'catppuccin',
      'colors',
      'colours',
      'pastel',
      'soothing',
    ],
    engines: {
      node: '>=18',
    },
  },
  async postBuild() {
    await Deno.copyFile('README.md', 'npm/README.md');
    await Deno.copyFile('LICENCE', 'npm/LICENCE');
  },
});
