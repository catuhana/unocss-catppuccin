import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';

import type { Preset } from '@unocss/core';
import type {
  CatppuccinLabels,
  CatppuccinVariants,
  ExtenderOptions,
  ThemeColours,
} from './types.ts';

/**
 * Extend theme to UnoCSS by using `extendTheme` function.
 */
export const extendCatppuccin = (options: ExtenderOptions = {}): Preset => {
  const { prefix = 'ctp', defaultVariant } = options;

  return {
    name: 'unocss-catppuccin',
    extendTheme: (theme: any) => {
      theme['colors'] ??= {};

      if (defaultVariant && catppuccinVariants[defaultVariant]) {
        const catppuccinLabelEntries = Object.entries(catppuccinLabels);

        if (prefix)
          theme['colors'][prefix] = catppuccinLabelEntries.reduce(
            (acc, [label, colour]) => {
              acc[label as CatppuccinLabels] = colour[defaultVariant].hex;
              return acc;
            },
            {} as ThemeColours
          );
        else {
          theme['colors'] = catppuccinLabelEntries.reduce(
            (acc, [label, colour]) => {
              if (theme['colors']?.[label]) {
                acc['ctp'] ??= {} as ThemeColours;
                acc['ctp'][label as CatppuccinLabels] =
                  colour[defaultVariant].hex;
              } else
                acc[label as CatppuccinLabels] = colour[defaultVariant].hex;

              return acc;
            },
            {} as ThemeColours & { ctp?: ThemeColours }
          );
        }
      } else {
        const target = prefix
          ? (theme['colors'][prefix] ??= {})
          : theme['colors'];

        Object.entries(catppuccinVariants).reduce((acc, [variant, colours]) => {
          acc[variant as CatppuccinVariants] = Object.entries(colours).reduce(
            (variantAcc, [label, colour]) => {
              variantAcc[label as CatppuccinLabels] = colour.hex;
              return variantAcc;
            },
            {} as ThemeColours
          );
          return acc as {};
        }, target);
      }
    },
  };
};
