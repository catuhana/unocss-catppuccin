import {
  flavors as flavours,
  flavorEntries as flavourEntries,
} from '@catppuccin/palette';

import type { ExtendOptions } from './types.js';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const extendTheme = (options: ExtendOptions = {}) => {
  const { prefix = 'ctp', defaultFlavour } = options;

  const extendTheme = (theme: any) => {
    theme['colors'] ??= {};

    let target = prefix ? (theme['colors'][prefix] ??= {}) : theme['colors'];
    if (defaultFlavour && flavours[defaultFlavour]) {
      for (let [colourName, colour] of flavours[defaultFlavour].colorEntries) {
        target[colourName] = colour.hex;
      }
    } else {
      for (let [flavourName, flavour] of flavourEntries) {
        const newTarget = (target[flavourName] ??= {});

        for (let [colourName, colour] of flavour.colorEntries) {
          newTarget[colourName] = colour.hex;
        }
      }
    }
  };

  return extendTheme;
};
