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

  const addFlavourColours = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    targetObj: Record<string, any>,
    flavour: PaletteColours,
    namespace?: string,
  ) => {
    if (namespace) {
      if (
        targetObj[namespace] !== undefined
        && typeof targetObj[namespace] !== 'object'
      ) {
        targetObj['ctp'] ??= {};
        targetObj['ctp'][namespace] ??= {};
        Object.assign(targetObj['ctp'][namespace], flavour);
        return;
      }

      targetObj[namespace] ??= {};
      Object.assign(targetObj[namespace], flavour);
      return;
    }

    if (!prefix) {
      targetObj['ctp'] ??= {};
      const ctpObj = targetObj['ctp']; // Cache this reference

      for (const [colorId, color] of Object.entries(flavour)) {
        if (colorId in targetObj) {
          // 'in' operator is slightly faster
          ctpObj[colorId] = color;
        } else {
          targetObj[colorId] = color;
        }
      }
    } else {
      Object.assign(targetObj, flavour);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (theme: Record<string, any>) => {
    theme[themeKey] ??= {};
    const targetObject =
      prefix ? (theme[themeKey][prefix] ??= {}) : theme[themeKey];

    if (defaultFlavour && defaultFlavour in FLAVOURS) {
      addFlavourColours(targetObject, FLAVOURS[defaultFlavour]);
    } else {
      for (const [flavourIdentifier, flavour] of Object.entries(FLAVOURS)) {
        addFlavourColours(targetObject, flavour, flavourIdentifier);
      }
    }
  };
};
