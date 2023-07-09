import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { PresetOptions } from '@unocss/core';

export type CatppuccinVariants = keyof typeof catppuccinVariants;
export type CatppuccinLabels = keyof typeof catppuccinLabels;

export interface ExtenderOptions extends PresetOptions {
  /**
   * Prefix for matching Catppuccin colours.
   *
   * @example
   * ```html
   * <!-- If the prefix is `ctp` -->
   * <p class='text-ctp-mocha-red'>Hello world!</p>
   * <p class='border-ctp-latte-base'>Hello world!</p>
   * ```
   *
   * @defaultValue undefined
   */
  prefix?: string;
  /**
   * Default variant for using Catppuccin colours
   * directly with according labels.
   *
   * Note: If a colour exists on the extended theme,
   * Catppuccin colour label will have the `ctp` prefix.
   *
   * @example
   * ```html
   * <p class='text-flamingo'>Hello world!</p>
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   *
   * @defaultValue undefined
   */
  defaultVariant?: CatppuccinVariants;
}
