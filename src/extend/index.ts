// TODO: Get rid of `any` usages.
import { FLAVOURS, type PaletteColours } from '../palette.ts';

import type { ExtendOptions } from './types.ts';

/**
 * Extend theme to UnoCSS by passing this to `extendTheme` function.
 *
 * @param options - Options for extending the theme.
 * @returns The main function that supposed to be passed
 * to UnoCSS `extendTheme` option.
 */
export const _extendTheme = (options: ExtendOptions = {}) => {
  const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

  const addFlavourColors = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    targetObj: Record<string, any>,
    flavour: PaletteColours,
    namespace?: string,
  ) => {
    for (const [colorId, color] of Object.entries(flavour)) {
      if (!prefix && targetObj[colorId] && !namespace) {
        targetObj['ctp'] ??= {};
        targetObj['ctp'][colorId] = color;
      } else if (namespace) {
        const namespaceObj = (targetObj[namespace] ??= {});
        namespaceObj[colorId] = color;
      } else {
        targetObj[colorId] = color;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (theme: Record<string, any>) => {
    theme[themeKey] ??= {};
    const targetObject =
      prefix ? (theme[themeKey][prefix] ??= {}) : theme[themeKey];

    if (defaultFlavour && defaultFlavour in FLAVOURS) {
      addFlavourColors(targetObject, FLAVOURS[defaultFlavour]);
    } else {
      for (const [flavourIdentifier, flavour] of Object.entries(FLAVOURS)) {
        addFlavourColors(targetObject, flavour, flavourIdentifier);
      }
    }
  };
};
