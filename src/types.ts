// TODO: Improve documentation.
import type { FlavourName } from './palette';

import type { PresetOptions } from '@unocss/core';

/**
 * Which mode to use the preset with.
 *
 * `extend` mode will create new colours for current preset by using
 * `extendTheme` function from UnoCSS.
 */
export type Modes = 'extend';

export interface UnoCSSCatppuccinOptions extends PresetOptions {
  /**
   * Which mode to use the preset with.
   *
   * `extend` mode will create new colours for current preset by using
   * `extendTheme` function from UnoCSS.
   *
   * @default 'extend'
   */
  mode?: Modes;

  /**
   * Theme colours key to use for extending the current preset.
   *
   * @default 'colors'
   */
  themeKey?: string;

  /**
   * Prefix for using Catppuccin colours.
   *
   * @example
   * ```html
   * <p class='text-ctp-mocha-red'>Hello world!</p>
   * <p class='border-ctp-latte-base'>Hello world!</p>
   * ```
   *
   * @default 'ctp'
   */
  prefix?: string | false;

  /**
   * Default flavour for using Catppuccin colours
   * directly with according colour labels.
   *
   * Note: If {@link prefix} is set to `false`,
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
   * <!-- Let's make it `false` -->
   * <!-- This will use current preset's colour! -->
   * <p class='bg-red'>Hello world!</p>
   * <!-- To use Catppuccin's colour, add the `ctp` prefix  -->
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   */
  defaultFlavour?: FlavourName;
}

/**
 * Options for the internal `_extendTheme` function.
 */
export interface ExtendOptions {
  themeKey?: string | undefined;
  prefix?: string | false;
  defaultFlavour?: FlavourName | undefined;
}
