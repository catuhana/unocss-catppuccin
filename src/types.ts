import { CatppuccinFlavors } from '@catppuccin/palette';
import type { PresetOptions } from '@unocss/core';

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
   * <!-- Lets make it a falsy value except `undefined` -->
   * <!-- This will use current preset's colour instead
   *      to not override preset values. -->
   * <p class='bg-red'>Hello world!</p>
   * <!-- To use Catppuccin's colour, add the `ctp` prefix  -->
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   *
   * @default undefined
   */
  defaultFlavour?: keyof CatppuccinFlavors;
  /**
   * Generate dark and light shades for colours or not.
   * 
   * Note: This might affect the performance, so it's
   * recommended to disable this if shades won't be used.
   * 
   * @example
   * ```html
   * <p class="bg-ctp-frappe-rose-300">Hello world!</p>
   * ```
   * 
   * @default true
   */
  generateShades?: boolean
}
