<center>

# [Catppuccin](https://catppuccin.com/) for [UnoCSS](https://unocss.dev)

🌸 Soothing pastel theme preset for UnoCSS!

[![CI Status](https://img.shields.io/github/actions/workflow/status/catuhana/unocss-catppuccin/ci.yaml?style=flat-square&logo=github-actions&label=CI&labelColor=%23eff1f5&color=%2340a02b)](https://github.com/catuhana/unocss-catppuccin/actions/workflows/ci.yaml)
[![npm Version](https://img.shields.io/npm/v/unocss-catppuccin?style=flat-square&logo=npm&labelColor=%23eff1f5&color=%2340a02b)](https://npmjs.com/package/unocss-catppuccin)
[![GitHub Stars](https://img.shields.io/github/stars/catuhana/unocss-catppuccin?style=flat-square&labelColor=%23eff1f5&color=%2340a02b)](https://github.com/catuhana/unocss-catppuccin/stargazers)

</center>

> [!WARNING]
> Since this preset is still being developed, there might be any kind of breaking changes.

# Installation

```sh
npm install unocss-catppuccin -D
# or
pnpm install unocss-catppuccin -D
# or
yarn add unocss-catppuccin -D
```

# Usage

To use Catppuccin, simply include the `extendCatppuccin` preset in your UnoCSS configuration.

```ts
// unocss.config.ts
import { defineConfig, presetUno } from 'unocss';
import { extendCatppuccin } from 'unocss-catppuccin';

export default defineConfig({
  presets: [presetUno(), extendCatppuccin(/* options */)],
});
```

# Options

Please refer to [src/types.d.ts](src/types.d.ts).

# License

This project is licensed under Apache License Version 2.0
