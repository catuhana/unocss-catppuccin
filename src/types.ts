import type { CatppuccinFlavors } from '@catppuccin/palette';

import type { PresetOptions } from '@unocss/core';

/**
 * Falsy values except `undefined`.
 *
 * `undefined` *is* considered as a falsy value, but if `prefix` option is
 * `undefined`, it will default to `ctp`.
 */
export type Falsy = false | 0 | '' | null;

/**
 * Which mode to use the preset with.
 *
 * `extend` mode will create new colours for current preset by using `extendTheme` function from UnoCSS.
 */
export type Modes = 'extend';

/**
 * Preset options for `unocss-catppuccin`.
 */
export interface UnoCSSCatppuccinOptions extends PresetOptions {
  /**
   * Which mode to use the preset with.
   *
   * `extend` mode will create new colours for current preset by using `extendTheme` function from UnoCSS.
   *
   * @default 'extend'
   */
  mode: Modes;

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
  prefix?: string | Falsy;

  /**
   * Default flavour for using Catppuccin colours
   * directly with according colour labels.
   *
   * Note: If {@link ExtenderOptions.prefix} is set to `undefined`,
   * and the desired colour already exists on the current preset,
   * the Catppuccin colour will be prefixed with `ctp`.
   *
   * @example
   * ```html
   * <!-- Default prefix is `ctp` -->
   * <p class='text-ctp-flamingo'>Hello world!</p>
   * <!-- Let's make it `meow` -->
   * <p class='text-meow-flamingo'>Hello world!</p>
   *
   * <!-- Let's make it a falsy value except `undefined`, for example `false` -->
   * <!-- This will use current preset's colour! -->
   * <p class='bg-red'>Hello world!</p>
   * <!-- To use Catppuccin's colour, add the `ctp` prefix  -->
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   *
   * @default undefined
   */
  defaultFlavour?: keyof CatppuccinFlavors;
}

/**
 * Options for the `_extendTheme` function.
 *
 * Picks `prefix` and `defaultFlavour` from {@link UnoCSSCatppuccinOptions}.
 */
export type ExtendOptions = Pick<
  UnoCSSCatppuccinOptions,
  'prefix' | 'defaultFlavour'
>;
