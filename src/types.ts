import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { PresetOptions } from 'unocss';

export type CatppuccinVariants = keyof typeof catppuccinVariants;
export type CatppuccinLabels = keyof typeof catppuccinLabels;

export interface ExtenderOptions<T extends CatppuccinVariants>
  extends PresetOptions {
  prefix?: string;
  defaultVariant?: T;
}

export type ThemeObject<T extends CatppuccinVariants | CatppuccinLabels> =
  T extends CatppuccinVariants
    ? Record<CatppuccinVariants, { [key in CatppuccinLabels]: string }>
    : Record<CatppuccinLabels, string>;
