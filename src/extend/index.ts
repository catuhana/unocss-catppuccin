import { FLAVOURS, type PaletteColours } from '../palette.ts';

import type { ExtendOptions, Theme as PresetTheme } from './types.ts';

/**
 * Extend theme to UnoCSS by passing this to `extendTheme` function.
 *
 * @param options - Options for extending the theme.
 * @returns The main function that supposed to be passed
 * to UnoCSS `extendTheme` option.
 */
export const _extendTheme = <
  ThemeKey extends string = 'colors',
  Prefix extends string | false = 'ctp',
  Theme extends PresetTheme<ThemeKey, Prefix> = PresetTheme<ThemeKey, Prefix>,
>({
  themeKey = 'colors' as ThemeKey,
  prefix = 'ctp' as Prefix,
  defaultFlavour,
}: ExtendOptions<ThemeKey, Prefix> = {}) => {
  const addFlavourColours = (
    targetObj: Theme[ThemeKey],
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
      const ctpObj = targetObj['ctp'];

      for (const [colorId, color] of Object.entries(flavour)) {
        if (colorId in targetObj) {
          ctpObj[colorId] = color;
        } else {
          targetObj[colorId] = color;
        }
      }
    } else {
      Object.assign(targetObj, flavour);
    }
  };

  return (theme: Theme) => {
    theme[themeKey] ??= {} as Theme[ThemeKey];

    const targetObject =
      prefix ?
        (theme[themeKey][prefix] ??= {} as Theme[ThemeKey][Prefix])
      : theme[themeKey];

    if (defaultFlavour && defaultFlavour in FLAVOURS) {
      addFlavourColours(targetObject, FLAVOURS[defaultFlavour]);
    } else {
      for (const [flavourIdentifier, flavour] of Object.entries(FLAVOURS)) {
        addFlavourColours(targetObject, flavour, flavourIdentifier);
      }
    }
  };
};
