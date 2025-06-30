<h3 align="center">
 <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
 Catppuccin for <a href="https://github.com/unocss/unocss">UnoCSS</a>
</h3>

<p align="center">
 <a href="https://github.com/catppuccin/unocss/stargazers"><img src="https://img.shields.io/github/stars/catppuccin/unocss?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
 <a href="https://github.com/catppuccin/unocss/issues"><img src="https://img.shields.io/github/issues/catppuccin/unocss?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
 <a href="https://github.com/catppuccin/unocss/contributors"><img src="https://img.shields.io/github/contributors/catppuccin/unocss?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
</p>

<!-- TODO: To be updated after addition of an example usage in this repo. -->
<p align="center">
 <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/preview.webp"/>
</p>

## Previews

<!-- TODO: Ditto. -->
<details>
  <summary>🌻 Latte</summary>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/latte.webp" />
</details>
<details>
  <summary>🪴 Frappé</summary>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/frappe.webp" />
</details>
<details>
  <summary>🌺 Macchiato</summary>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/macchiato.webp" />
</details>
<details>
  <summary>🌿 Mocha</summary>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/previews/mocha.webp" />
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
    import { defineConfig } from 'unocss';

    import presetWind4 from '@unocss/preset-wind4';
    import presetCatppuccin from '@catppuccin/unocss';

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

3. Configure the preset if needed. Refer to the FAQ for documentation <!-- TODO: Link to FAQ directly -->

## 🙋 FAQ

- Q: Where can I find the documentation?\
  A: Documentation can be found at <https://unocss.catppuccin.org/docs> <!-- TODO: Generate and push the documentation there -->

## 💝 Thanks to

- [tuhana](https://github.com/catuhana)

&nbsp;

<p align="center">
 <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" />
</p>

<p align="center">
 Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
</p>

<p align="center">
 <a href="https://github.com/catppuccin/unocss/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a>
</p>
