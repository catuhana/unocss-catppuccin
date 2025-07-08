import {
  flavorEntries,
  flavors,
  type CatppuccinFlavor,
} from '@catppuccin/palette';

import type { ThemeExtender } from '@unocss/core';

import type { ExtendOptions } from './types.ts';

/**
 * Extend the `theme` object of UnoCSS by passing this
 * function to its `extendTheme` option.
 *
 * @param options - Options for the extender
 */
export const _extendTheme = (options: ExtendOptions = {}) => {
  const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

  /**
   * Adds Catppuccin colours to the target object.
   *
   * @param targetObj - Target theme object to extend
   * @param flavour - The Catppuccin flavour object
   * @param namespace - Optional namespace to nest colours under
   */
  const addFlavourColours = (
    targetObj: ThemeColoursObject,
    flavour: CatppuccinFlavor,
    namespace?: string,
  ) => {
    const colourEntries = Object.entries(flavour.colors);
    let targetContainer: ThemeColoursObject;

    if (namespace) {
      if (
        targetObj[namespace] !== undefined
        && typeof targetObj[namespace] !== 'object'
      ) {
        if (!targetObj['ctp']) targetObj['ctp'] = {};
        const targetObjCtp = targetObj['ctp'] as ThemeColoursObject;

        if (!targetObjCtp[namespace]) targetObjCtp[namespace] = {};
        targetContainer = targetObjCtp[namespace] as ThemeColoursObject;
      } else {
        if (!targetObj[namespace]) targetObj[namespace] = {};
        targetContainer = targetObj[namespace];
      }
    } else if (prefix) {
      targetContainer = targetObj;
    } else {
      targetContainer = targetObj;
    }

    for (const [colourName, colourData] of colourEntries) {
      if (!prefix && colourName in targetObj) {
        if (!targetObj['ctp']) targetObj['ctp'] = {};
        const targetObjCtp = targetObj['ctp'] as ThemeColoursObject;

        targetObjCtp[colourName] = colourData.hex;
      } else {
        targetContainer[colourName] = colourData.hex;
      }
    }
  };

  return (baseTheme => {
    const theme = baseTheme as Record<string, ThemeColoursObject>;

    if (!theme[themeKey]) theme[themeKey] = {};

    let targetObject = theme[themeKey];
    if (prefix) {
      if (!targetObject[prefix]) targetObject[prefix] = {};
      targetObject = targetObject[prefix] = targetObject[
        prefix
      ] as ThemeColoursObject;
    }

    if (defaultFlavour && defaultFlavour in flavors) {
      addFlavourColours(targetObject, flavors[defaultFlavour]);
    } else {
      for (const [flavourIdentifier, flavour] of flavorEntries) {
        addFlavourColours(targetObject, flavour, flavourIdentifier);
      }
    }
  }) satisfies ThemeExtender;
};

/**
 * Nested object structure for theme colours.
 *
 * @internal
 */
export interface ThemeColoursObject {
  [key: string]: ThemeColoursObject | string;
}
