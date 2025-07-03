import { defineConfig } from 'astro/config';

import UnoCSS from 'unocss/astro';

export default defineConfig({
  // TODO: Update next two lines after moving to
  // the Catppuccin organisation.
  site: 'https://catuhana.github.io',
  base: '/unocss-catppuccin',
  integrations: [UnoCSS()],
});
