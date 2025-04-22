[![Licence](https://badgers.space/github/license/catuhana/unocss-catppuccin)](#licence)
[![npm Version](https://badgers.space/npm/version/unocss-catppuccin)](https://npmjs.com/package/unocss-catppuccin)
[![CI Status](https://badgers.space/github/checks/catuhana/unocss-catppuccin)](https://github.com/catuhana/unocss-catppuccin/actions)

<!-- [![Documentation Status](https://badgers.space/github/checks/catuhana/unocss-catppuccin/main/docs)](https://github.com/catuhana/unocss-catppuccin/actions) -->

# [Catppuccin](https://catppuccin.com/) for [UnoCSS](https://unocss.dev)

🌸 Soothing pastel colour theme preset for UnoCSS!

<!-- TODO: Add showcase/previews etc. -->

# Installation

<!-- TODO: Add JSR back once https://github.com/denoland/deno/issues/26587
  is fixed. -->

```sh
npm install -D unocss-catppuccin
# or
pnpm add -D unocss-catppuccin
# or
yarn add -D unocss-catppuccin
```

# Usage

1. Install the [preset](#installation),

2. apply the preset to your [configuration file](https://unocss.dev/guide/config-file),

```ts
// uno.config.ts
import { defineConfig } from 'unocss';

import presetWind4 from '@unocss/preset-wind4';
import presetCatppuccin from 'unocss-catppuccin';

export default defineConfig({
  presets: [
    /*
      A preset with CSS utilities must be used for this preset
      to extend its colours in `extend` mode option, which is
      the default.
    */
    presetWind4(),
    presetCatppuccin(/* options */),
  ],
});
```

3. and voila! You can now use Catppuccin!

```html
<div class="bg-ctp-latte-base">
  <span class="text-ctp-latte-mauve">Hello</span>
  <span class="text-ctp-latte-lavender">Catppuccin!</span>
</div>
```

# Documentation

TODO

<!-- TODO: Add #Contributing -->

# Licence

This project is licenced under [Mozilla Public License Version 2.0](LICENCE).
