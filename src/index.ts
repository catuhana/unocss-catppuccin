import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { Preset } from 'unocss';
import type {
  CatppuccinLabels,
  CatppuccinVariants,
  ExtenderOptions,
  ThemeObject,
} from './types.js';

export const extendCatppuccin = <T extends keyof typeof catppuccinVariants>(
  options?: ExtenderOptions<T>
): Preset => {
  const prefix = options?.prefix;
  const defaultVariant = options?.defaultVariant;

  let themeObject: ThemeObject<CatppuccinLabels | CatppuccinVariants>;
  if (defaultVariant && catppuccinVariants[defaultVariant]) {
    themeObject = {} as ThemeObject<CatppuccinLabels>;

    for (const [label, colours] of Object.entries(catppuccinLabels)) {
      themeObject[label as CatppuccinLabels] = colours[defaultVariant].hex;
    }
  } else {
    themeObject = {} as ThemeObject<CatppuccinVariants>;

    for (const [variant, colours] of Object.entries(catppuccinVariants)) {
      const typedVariant = variant as CatppuccinVariants;
      themeObject[typedVariant] = {} as { [key in CatppuccinLabels]: string };

      for (const [label, colour] of Object.entries(colours)) {
        themeObject[typedVariant][label as CatppuccinLabels] = colour.hex;
      }
    }
  }

  return {
    name: 'unocss-catppuccin-colours',
    theme: {
      colors: prefix ? { [prefix]: themeObject } : themeObject,
    },
  };
};
