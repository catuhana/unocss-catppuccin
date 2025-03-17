import { flavorEntries, flavors } from '@catppuccin/palette';

import type { CatppuccinFlavor } from '@catppuccin/palette';

import type { ExtendOptions } from './types';

/**
 * Extend theme to UnoCSS by passing this to `extendTheme` function.
 *
 * @param options - Options for extending the theme.
 * @returns The main function that supposed to be passed
 * to UnoCSS `extendTheme` option.
 */
export const _extendTheme = (options: ExtendOptions = {}) => {
  const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (theme: Record<string, any>) => {
    theme[themeKey] ??= {};

    const targetObject =
      prefix ? (theme[themeKey][prefix] ??= {}) : theme[themeKey];

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetObject: Record<string, any>,
  colourEntries: CatppuccinFlavor['colorEntries'],
  prefix: string | false,
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
