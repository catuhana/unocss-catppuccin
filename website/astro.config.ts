import { defineConfig, envField } from 'astro/config';

import UnoCSS from 'unocss/astro';

import { presetWind4, transformerDirectives } from 'unocss';
import presetCatppuccin from '@catppuccin/unocss';

import {
  ACCENT_COLOUR_NAMES,
  NEUTRAL_COLOUR_NAMES,
} from '@catppuccin/unocss/palette';

export default defineConfig({
  // TODO: Update next two lines after moving to
  // the Catppuccin organisation.
  site: 'https://catuhana.github.io',
  base: '/unocss-catppuccin',
  integrations: [
    UnoCSS({
      presets: [
        presetWind4({ preflights: { reset: true, theme: true } }),
        presetCatppuccin(),
      ],
      transformers: [transformerDirectives()],
      safelist: generateSafelist(),
    }),
  ],
  env: {
    schema: {
      DETERMINISTIC_PILL_LENGTH: envField.boolean({
        context: 'client',
        access: 'public',
        optional: true,
        default: false,
      }),
    },
  },
});

function generateSafelist() {
  return [
    ...ACCENT_COLOUR_NAMES.map(colour => `bg-[--ctp-${colour}]`),
    ...NEUTRAL_COLOUR_NAMES.map(colour => `bg-[--ctp-${colour}]`),
  ];
}
