<h3 align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	Catppuccin for <a href="https://github.com/unocss/unocss">UnoCSS</a>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
	<a href="https://github.com/tuhanayim/unocss-catppuccin-colours/stargazers"><img src="https://img.shields.io/github/stars/tuhanayim/unocss-catppuccin-colours?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
	<a href="https://github.com/tuhanayim/unocss-catppuccin-colours/issues"><img src="https://img.shields.io/github/issues/tuhanayim/unocss-catppuccin-colours?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
	<a href="https://github.com/tuhanayim/unocss-catppuccin-colours/contributors"><img src="https://img.shields.io/github/contributors/tuhanayim/unocss-catppuccin-colours?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/preview.webp"/>
</p>

## Previews

_Todo_

## Usage

1. Install package as development

```sh
npm/pnpm install unocss-catppuccin-colours -D
yarn add unocss-catppuccin-colours -D
```

2. Add it to UnoCSS configuration's `theme.extend.colors` object.

```ts
import { presetMini, defineConfig } from 'unocss';
import { extendCatppuccin } from 'unocss-catppuccin-colours';

defineConfig({
  presets: [presetMini()],
  theme: {
    colors: extendCatppuccin(/* options */),
  },
});
```

And you're good to go!

## 💝 Thanks to

- [tuhana](https://github.com/tuhanayim)

&nbsp;

<p align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" />
</p>

<p align="center">
	Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
</p>

<p align="center">
	<a href="https://github.com/catppuccin/catppuccin/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a>
</p>
