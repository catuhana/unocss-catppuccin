import { defineConfig } from 'astro/config';

import UnoCSS from 'unocss/astro';

export default defineConfig({
  site: 'https://unocss.catppuccin.org',
  integrations: [UnoCSS()],
});
