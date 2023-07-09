import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { Preset } from 'unocss';
import type {
  CatppuccinLabels,
  CatppuccinVariants,
  ExtenderOptions,
} from './types.js';

export const extendCatppuccin = <T extends keyof typeof catppuccinVariants>(
  options?: ExtenderOptions<T>
): Preset => {
  const prefix = options?.prefix;
  const defaultVariant = options?.defaultVariant;

  return {
    name: 'unocss-catppuccin-colours',
    extendTheme: (theme: any) => {
      theme['colors'] ??= {};

      if (defaultVariant && catppuccinVariants[defaultVariant]) {
        type ThemeColours = { [label in CatppuccinLabels]: string };

        const [prefixedColours, nonPrefixedColours] = Object.entries(
          catppuccinLabels
        ).reduce(
          (acc, [label, colour]) => {
            if (theme['colors']?.[label]) {
              acc[0][label as CatppuccinLabels] = colour[defaultVariant].hex;
            } else {
              acc[1][label as CatppuccinLabels] = colour[defaultVariant].hex;
            }
            return acc;
          },
          [{}, {}] as [ThemeColours & { ctp?: ThemeColours }, ThemeColours]
        );

        if (prefix)
          theme['colors'][prefix ?? 'ctp'] = {
            ...prefixedColours,
            ...nonPrefixedColours,
          };
        else {
          if (Object.keys(prefixedColours).length)
            theme['colors']['ctp'] = prefixedColours;

          Object.assign(theme['colors'], nonPrefixedColours);
        }
      } else {
        const target = prefix
          ? (theme['colors'][prefix] ??= {})
          : theme['colors'];

        for (const [variant, colours] of Object.entries(catppuccinVariants)) {
          target[variant as CatppuccinVariants] = {};

          for (const [label, colour] of Object.entries(colours)) {
            target[variant as CatppuccinVariants][label] = colour.hex;
          }
        }
      }
    },
  };
};
