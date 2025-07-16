<!-- markdownlint-disable no-inline-html first-line-h1 -->

<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Catppuccin Logo" />
  <br />
  Catppuccin for <a href="https://github.com/unocss/unocss">UnoCSS</a>
</h3>

<p align="center">
  <a href="https://github.com/catppuccin/unocss/stargazers">
    <img src="https://img.shields.io/github/stars/catppuccin/unocss?colorA=363a4f&colorB=b7bdf8&style=for-the-badge" alt="Stars Count Badge" /></a>
  <a href="https://github.com/catppuccin/unocss/issues">
    <img src="https://img.shields.io/github/issues/catppuccin/unocss?colorA=363a4f&colorB=f5a97f&style=for-the-badge" alt="Issues Count Badge" /></a>
  <a href="https://github.com/catppuccin/unocss/contributors">
    <img src="https://img.shields.io/github/contributors/catppuccin/unocss?colorA=363a4f&colorB=a6da95&style=for-the-badge" alt="Contributors Count Badge" /></a>
</p>

<p align="center">
  <img src="./assets/previews/preview.webp" alt="Preview" />
</p>

## Previews

<details>
  <summary>🌻 Latte</summary>
  <img src="./assets/previews/latte.webp" alt="Latte Preview" />
</details>
<details>
  <summary>🪴 Frappé</summary>
  <img src="./assets/previews/frappe.webp" alt="Frappé Preview" />
</details>
<details>
  <summary>🌺 Macchiato</summary>
  <img src="./assets/previews/macchiato.webp" alt="Macchiato Preview" />
</details>
<details>
  <summary>🌿 Mocha</summary>
  <img src="./assets/previews/mocha.webp" alt="Mocha Preview" />
</details>

## Usage

1. Install the npm package `@catppuccin/unocss`

   ```sh
   npm install -D @catppuccin/unocss
   # or
   pnpm add -D @catppuccin/unocss
   # or
   yarn add -D @catppuccin/unocss
   ```

2. Add the preset to your UnoCSS configuration

   ```ts
   // uno.config.ts
   import { presetWind4, defineConfig } from 'unocss';
   import presetCatppuccin from '@catppuccin/unocss';
  
   export default defineConfig({
     presets: [
       presetWind4(),
       presetCatppuccin({
         // options
       })
     ]
   });
   ```

3. Configure the preset if needed. Refer to the [FAQ](#-faq) for documentation

## 🙋 FAQ

- Q: Where can I find the documentation?\
  A: Documentation can be found at <https://unocss.catppuccin.com/docs>

## 💝 Thanks to

- [tuhana](https://github.com/catuhana)

&nbsp;

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" alt="Catppuccin Line Separator" />
</p>

<p align="center">
  Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
</p>

<p align="center">
  <a href="./LICENCE">
    <img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8" alt="Licence Badge" />
  </a>
</p>
