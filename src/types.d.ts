import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { PresetOptions } from '@unocss/core';

export type CatppuccinVariants = keyof typeof catppuccinVariants;
export type CatppuccinLabels = keyof typeof catppuccinLabels;

export interface ExtenderOptions extends PresetOptions {
  prefix?: string;
  defaultVariant?: CatppuccinVariants;
}
