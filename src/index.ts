import {
  flavors as flavours,
  flavorEntries as flavourEntries,
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

      let target = prefix ? (theme['colors'][prefix] ??= {}) : theme['colors'];
      if (defaultFlavour && flavours[defaultFlavour]) {
        for (let [colourName, colour] of flavours[defaultFlavour]
          .colorEntries) {
          if (target[colourName]) continue;

          if (generateShades) {
            target[colourName] ??= generateShadePalette(colour);
          } else {
            target[colourName] = colour.hex;
          }
        }
      } else {
        for (let [flavourName, flavour] of flavourEntries) {
          if (target[flavourName]) continue;

          target[flavourName] ??= {};
          for (let [colourName, colour] of flavour.colorEntries) {
            if (generateShades) {
              target[flavourName][colourName] = generateShadePalette(colour);
            } else {
              target[flavourName][colourName] = colour.hex;
            }
          }
        }
      }
    },
  };
};
