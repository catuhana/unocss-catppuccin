<center>

# [Catppuccin](https://catppuccin.com/) for [UnoCSS](https://unocss.dev)

🌸 Soothing pastel theme preset for UnoCSS!

[![CI Status](https://img.shields.io/github/actions/workflow/status/catuhana/unocss-catppuccin/ci.yaml?style=flat-square&logo=github-actions&label=CI&labelColor=%23eff1f5&color=%2340a02b)](https://github.com/catuhana/unocss-catppuccin/actions/workflows/ci.yaml)
[![npm Version](https://img.shields.io/npm/v/unocss-catppuccin?style=flat-square&logo=npm&labelColor=%23eff1f5&color=%2340a02b)](https://npmjs.com/package/unocss-catppuccin)
[![JSR](https://jsr.io/badges/@tuhana/unocss-catppuccin)](https://jsr.io/@tuhana/unocss-catppuccin)
[![GitHub Stars](https://img.shields.io/github/stars/catuhana/unocss-catppuccin?style=flat-square&labelColor=%23eff1f5&color=%2340a02b)](https://github.com/catuhana/unocss-catppuccin/stargazers)

</center>

# Installation

```sh
npm install -D unocss-catppuccin
# or
pnpm add -D unocss-catppuccin
# or
yarn add -D unocss-catppuccin
# or
deno add jsr:unocss-catppuccin
```

# Usage

To use Catppuccin, include the `presetCatppuccin` preset in your UnoCSS
configuration.

```ts
// unocss.config.ts
import { defineConfig, presetUno } from 'unocss';
import { presetCatppuccin } from 'unocss-catppuccin';

export default defineConfig({
  presets: [presetUno(), presetCatppuccin(/* options */)],
});
```

# Options

Please refer to
[the documentation in jsr.io](https://jsr.io/@tuhana/unocss-catppuccin/doc).

# Licence

This project is licenced under [Mozilla Public License Version 2.0](LICENCE).
