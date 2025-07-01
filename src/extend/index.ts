import { COLOURS, type FlavourPalette } from '../palette.ts';

import type { ExtendOptions, ThemeColoursObject } from './types.ts';

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
    targetObj: ThemeColoursObject,
    flavour: FlavourPalette,
    namespace?: string,
  ) => {
    if (namespace) {
      if (
        targetObj[namespace] !== undefined
        && typeof targetObj[namespace] !== 'object'
      ) {
        if (!targetObj['ctp']) targetObj['ctp'] = {};

        const targetObjCtp = targetObj['ctp'] as ThemeColoursObject;
        if (!targetObjCtp[namespace]) targetObjCtp[namespace] = {};

        Object.assign(targetObjCtp[namespace], flavour);

        return;
      }

      if (!targetObj[namespace]) targetObj[namespace] = {};
      Object.assign(targetObj[namespace], flavour);

      return;
    }

    if (prefix) {
      Object.assign(targetObj, flavour);

      return;
    }

    if (!targetObj['ctp']) targetObj['ctp'] = {};
    const targetObjCtp = targetObj['ctp'] as ThemeColoursObject;
    for (const [colourId, colour] of Object.entries(flavour)) {
      if (colourId in targetObj) {
        targetObjCtp[colourId] = colour;
      } else {
        targetObj[colourId] = colour;
      }
    }
  };

  return (_theme: object) => {
    const theme = _theme as Record<string, ThemeColoursObject>;

    if (!theme[themeKey]) theme[themeKey] = {};

    let targetObject = theme[themeKey];
    if (prefix) {
      if (!targetObject[prefix]) targetObject[prefix] = {};
      targetObject = targetObject[prefix] = targetObject[
        prefix
      ] as ThemeColoursObject;
    }

    if (defaultFlavour && defaultFlavour in COLOURS) {
      addFlavourColours(targetObject, COLOURS[defaultFlavour]);
    } else {
      for (const [flavourIdentifier, flavour] of Object.entries(COLOURS)) {
        addFlavourColours(targetObject, flavour, flavourIdentifier);
      }
    }
  };
};
