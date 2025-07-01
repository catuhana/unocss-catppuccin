import { defineConfig, envField } from 'astro/config';

import UnoCSS from 'unocss/astro';

import { presetWind4, transformerDirectives } from 'unocss';
import presetCatppuccin from '@catppuccin/unocss';

export default defineConfig({
  // TODO: Update next two lines after moving to
  // the Catppuccin organisation.
  site: 'https://catuhana.github.io',
  base: '/unocss-catppuccin/',
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
  // TODO: Use `catppuccin-colours/palette`
  const flavours = ['latte', 'frappe', 'macchiato', 'mocha'];
  const colours = [
    'rosewater',
    'flamingo',
    'pink',
    'mauve',
    'red',
    'maroon',
    'peach',
    'yellow',
    'green',
    'teal',
    'sky',
    'sapphire',
    'blue',
    'lavender',
    'text',
    'subtext1',
    'subtext0',
    'overlay2',
    'overlay1',
    'overlay0',
    'surface2',
    'surface1',
    'surface0',
    'base',
    'mantle',
    'crust',
  ];

  return [
    ...colours.map(colour => `bg-[--ctp-${colour}]`),
    ...flavours.map(flavour => `bg-ctp-${flavour}-surface1`),
    ...flavours.map(flavour => `hover:bg-ctp-${flavour}-surface2`),
    ...flavours.map(flavour => `text-ctp-${flavour}-text`),
  ];
}
