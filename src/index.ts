import {
  flavors as flavours,
  flavorEntries as flavourEntries,
  type ColorFormat as ColourFormat,
} from '@catppuccin/palette';

import { generateShadePalette } from './shade.ts';

import type { Preset } from '@unocss/core';
import type { ExtenderOptions } from './types.ts';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const extendCatppuccin = (options: ExtenderOptions = {}): Preset => {
  const { prefix = 'ctp', defaultFlavour, generateShades = true } = options;

  return {
    name: 'unocss-catppuccin',
    extendTheme: (theme: any) => {
      theme['colors'] ??= {};

      const target = prefix
        ? (theme['colors'][prefix] ??= {})
        : theme['colors'];

      const colourProcessor = generateShades
        ? generateShadePalette
        : (colour: ColourFormat) => colour.hex;

      if (defaultFlavour && flavours[defaultFlavour]) {
        for (const [colourName, colour] of flavours[defaultFlavour]
          .colorEntries) {
          if (target[colourName]) continue;

          target[colourName] ??= colourProcessor(colour);
        }
      } else {
        for (let [flavourName, flavour] of flavourEntries) {
          if (target[flavourName]) continue;

          target[flavourName] ??= {};
          for (const [colourName, colour] of flavour.colorEntries) {
            target[flavourName][colourName] ??= colourProcessor(colour);
          }
        }
      }
    },
  };
};
