import {
  flavors as flavours,
  flavorEntries as flavourEntries,
} from '@catppuccin/palette';

import type { ExtendOptions } from './types.ts';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const extendTheme = (
  options: ExtendOptions = {}
): ((theme: any) => void) => {
  const { prefix = 'ctp', defaultFlavour } = options;

  const extendTheme = (theme: any): void => {
    theme['colors'] ??= {};

    // Determine the target object where the colours will be added
    const target = prefix ? (theme['colors'][prefix] ??= {}) : theme['colors'];

    // If `defaultFlavour` is set, and if it exists:
    if (defaultFlavour && flavours[defaultFlavour]) {
      // Iterate through the colours of the flavours and add them to the target
      for (let [colourName, colour] of flavours[defaultFlavour].colorEntries) {
        if (!prefix && target[colourName]) {
          target['ctp'] ??= {};
          target['ctp'][colourName] = colour.hex;
        } else {
          target[colourName] = colour.hex;
        }
      }
    }
    // If `defaultFlavour` is not set, or if it doesn't exist:
    else {
      // Iterate through all the flavours,
      for (let [flavourName, flavour] of flavourEntries) {
        // create an empty object for that flavour
        //! We have to create a new variable to prevent
        //! accidentally nesting flavours inside each other
        const newTarget = (target[flavourName] ??= {});

        // Iterate through the colours of the flavour
        for (let [colourName, colour] of flavour.colorEntries) {
          // and add them to the new target
          newTarget[colourName] = colour.hex;
        }
      }
    }
  };

  return extendTheme;
};
