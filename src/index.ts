import {
  flavors as flavours,
  flavorEntries as flavourEntries,
} from '@catppuccin/palette';

import type { Preset } from '@unocss/core';
import type { ExtenderOptions } from './types.ts';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const extendCatppuccin = (options: ExtenderOptions = {}): Preset => {
  const { prefix = 'ctp', defaultFlavour } = options;

  return {
    name: 'unocss-catppuccin',
    extendTheme: (theme: any) => {
      theme['colors'] ??= {};

      let target = prefix ? (theme['colors'][prefix] ??= {}) : theme['colors'];
      if (defaultFlavour && flavours[defaultFlavour]) {
        for (let [colourName, colour] of flavours[defaultFlavour]
          .colorEntries) {
          target[colourName] = colour.hex;
        }
      } else {
        for (let [flavourName, flavour] of flavourEntries) {
          target = target[flavourName] ??= {};
          for (let [colourName, colour] of flavour.colorEntries) {
            target[colourName] = colour.hex;
          }
        }
      }
    },
  };
};
