import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import presetCatppuccin from '@catppuccin/unocss';

import {
  ACCENT_COLOUR_NAMES,
  NEUTRAL_COLOUR_NAMES,
} from '@catppuccin/unocss/palette';

export default defineConfig({
  presets: [presetWind4({ preflights: { reset: true } }), presetCatppuccin()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: generateSafelist(),
});

function generateSafelist() {
  return [
    ...ACCENT_COLOUR_NAMES.map(colour => `bg-[--ctp-${colour}]`),
    ...NEUTRAL_COLOUR_NAMES.map(colour => `bg-[--ctp-${colour}]`),
  ];
}
