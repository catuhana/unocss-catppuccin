import {
  flavorEntries as flavourEntries,
  flavors as flavours,
} from '@catppuccin/palette';

import type { ExtendOptions } from './types.ts';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const _extendTheme = <Theme extends object = object>(
  options: ExtendOptions = {},
): (theme: Theme) => void => {
  const { prefix = 'ctp', defaultFlavour } = options;

  //* We don't know what `theme` could be, since it's provided to us
  //* by UnoCSS. I think we could type-safe the parts we have
  //* (`ThemeObject` type), but I'm not sure how to do that.
  // deno-lint-ignore no-explicit-any
  const extendTheme = (theme: any): void => {
    theme['colors'] ??= {};

    // Determine the target object where the colours will be added
    const target = prefix ? (theme['colors'][prefix] ??= {}) : theme['colors'];

    // If `defaultFlavour` is set, and if it exists:
    if (defaultFlavour && flavours[defaultFlavour]) {
      // Iterate through the colours of that flavour and add them to the target
      for (
        const [colourName, colour] of flavours[defaultFlavour]
          .colorEntries
      ) {
        if (!prefix && target[colourName]) {
          target['ctp'] ??= {};
          target['ctp'][colourName] = colour.hex;
        } else {
          target[colourName] = colour.hex;
        }
      }
    } // If `defaultFlavour` is not set, or specified flavour doesn't exist:
    else {
      // Iterate through all the flavours,
      for (const [flavourName, flavour] of flavourEntries) {
        // create an empty object for that flavour
        //! We have to create a new variable to prevent
        //! accidentally nesting flavours inside each other
        const newTarget = (target[flavourName] ??= {});

        // Iterate through the colours of the flavour
        for (const [colourName, colour] of flavour.colorEntries) {
          // and add them to the new target
          newTarget[colourName] = colour.hex;
        }
      }
    }
  };

  return extendTheme;
};
