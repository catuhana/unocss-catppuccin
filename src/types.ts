import {
  variants as catppuccinVariants,
  labels as catppuccinLabels,
} from '@catppuccin/palette';
import type { PresetOptions } from '@unocss/core';

export type CatppuccinVariants = keyof typeof catppuccinVariants;
export type CatppuccinLabels = keyof typeof catppuccinLabels;
export type ThemeColours = { [label in CatppuccinLabels]: string };

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
   * @default 'ctp'
   */
  prefix?: string;
  /**
   * Default variant for using Catppuccin colours
   * directly with according labels.
   *
   * Note: If {@link ExtenderOptions.prefix} is set to `undefined`,
   * and the desired colour already exists in the current preset,
   * the Catppuccin colour will be prefixed with `ctp`.
   *
   * @example
   * ```html
   * <!-- Default prefix is `ctp` -->
   * <p class='text-ctp-flamingo'>Hello world!</p>
   * <!-- Let's make it `meow` -->
   * <p class='text-meow-flamingo'>Hello world!</p>
   *
   * <!-- Lets make it `undefined` -->
   * <!-- This will use current preset's colour! -->
   * <p class='bg-red'>Hello world!</p>
   * <!-- To use Catppuccin's colour, add the `ctp` prefix  -->
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   *
   * @default undefined
   */
  defaultVariant?: CatppuccinVariants;
}
