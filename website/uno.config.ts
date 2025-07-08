import {
  defineConfig,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import presetCatppuccin from '@catppuccin/unocss/index.ts';
import { flavorEntries } from '@catppuccin/palette';

export default defineConfig({
  presets: [presetWind4({ preflights: { reset: true } }), presetCatppuccin()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [...generateSafelist()],
});

function generateSafelist() {
  return flavorEntries
    .flatMap(([, { colorEntries }]) => colorEntries)
    .map(([colourName]) => `bg-[--ctp-${colourName}]`);
}
