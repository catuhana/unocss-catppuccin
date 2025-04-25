[![Licence](https://badgers.space/github/license/catuhana/unocss-catppuccin)](#licence)
[![npm Version](https://badgers.space/npm/version/unocss-catppuccin)](https://npmjs.com/package/unocss-catppuccin)
[![CI Status](https://badgers.space/github/checks/catuhana/unocss-catppuccin)](https://github.com/catuhana/unocss-catppuccin/actions)
[![Documentation Status](https://badgers.space/github/checks/catuhana/unocss-catppuccin/main/Publish%20Documentation?label=docs)](https://catuhana.github.io/unocss-catppuccin)

# [Catppuccin](https://catppuccin.com/) for [UnoCSS](https://unocss.dev)

🌸 Soothing pastel colour theme preset for UnoCSS!

<!-- TODO: Add showcase/previews etc. -->

## Installation

<!-- TODO: Add JSR back once https://github.com/denoland/deno/issues/26587
  is fixed. -->

```sh
npm install -D unocss-catppuccin
# or
pnpm add -D unocss-catppuccin
# or
yarn add -D unocss-catppuccin
```

## Usage

After adding the preset to UnoCSS configuration file,

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

you can now use Catppucin colours!

```html
<div class="bg-ctp-latte-base">
  <span class="text-ctp-latte-mauve">Hello</span>
  <span class="text-ctp-latte-lavender">Catppuccin!</span>
</div>
```

### Options

You can check the [documentation for `options` here](https://catuhana.github.io/unocss-catppuccin/interfaces/types.UnoCSSCatppuccinOptions.html).

<!-- TODO: Add #Contributing -->

## Licence

This project is licenced under [Mozilla Public License Version 2.0](LICENCE).
