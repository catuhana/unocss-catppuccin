import { flavorEntries, flavors } from '@catppuccin/palette';

import type { CatppuccinFlavor } from '@catppuccin/palette';
import type { ExtendOptions, Falsy } from './types.ts';

/**
 * Extend theme to UnoCSS by passing this to `extendTheme` function.
 *
 * @param options - Options for extending the theme.
 * @returns The main function that supposed to be passed
 * to UnoCSS `extendTheme` option.
 */
export const _extendTheme = (
  options: ExtendOptions = {},
  // deno-lint-ignore no-explicit-any
): (theme: Record<string, any>) => void => {
  const { prefix = 'ctp', defaultFlavour } = options;

  return (theme): void => {
    theme.colors ??= {};

    const targetObject = prefix ? (theme.colors[prefix] ??= {}) : theme.colors;

    if (defaultFlavour && flavors[defaultFlavour]) {
      addColoursToTarget(
        targetObject,
        flavors[defaultFlavour].colorEntries,
        prefix,
      );
    } else {
      for (const [flavourName, flavour] of flavorEntries) {
        targetObject[flavourName] ??= {};
        addColoursToTarget(
          targetObject[flavourName],
          flavour.colorEntries,
          prefix,
        );
      }
    }
  };
};

function addColoursToTarget(
  // deno-lint-ignore no-explicit-any
  targetObject: any,
  colourEntries: CatppuccinFlavor['colorEntries'],
  prefix: string | Falsy,
) {
  for (const [colourName, colour] of colourEntries) {
    if (!prefix && targetObject[colourName]) {
      targetObject['ctp'] ??= {};
      targetObject['ctp'][colourName] = colour.hex;
    } else {
      targetObject[colourName] = colour.hex;
    }
  }
}
