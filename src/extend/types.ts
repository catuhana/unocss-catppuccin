import type { FlavourName } from '../palette.ts';

export type DynamicFlavourSelector = `[${string}]` | `.` | `#`;

export interface ExtendOptions {
  /**
   * Which `theme` object key to add the colours to.
   *
   * @default 'colors'
   */
  themeKey?: string;

  /**
   * Prefix to use for Catppuccin colours.
   *
   * When set to `false`, the prefix is removed and
   * colours are added directly to the theme. If a
   * Catppuccin colour conflicts with another preset's
   * colour, the Catppuccin colour will be prefixed with
   * `ctp`.
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
   * Default flavour to use colours directly from.
   *
   * When specified, colours from this flavour are added
   * directly without the flavour name.
   *
   * If {@link prefix} is set to `false` with the combination
   * of this option, and if a Catppuccin colour conflicts with
   * another preset's colour, the Catppuccin colour will be
   * prefixed with `ctp`.
   *
   * @example
   * ```html
   * <!-- Default prefix is `ctp` -->
   * <p class='text-ctp-flamingo'>Hello world!</p>
   * <!-- Let's make it `meow` -->
   * <p class='text-meow-flamingo'>Hello world!</p>
   *
   * <!-- Let's make it `false` -->
   * <!-- If they conflict, this will use current preset's colour! -->
   * <p class='bg-red'>Hello world!</p>
   * <!-- To use Catppuccin's colour instead, add the `ctp` prefix  -->
   * <p class='bg-ctp-red'>Hello world!</p>
   * ```
   */
  defaultFlavour?: FlavourName;

  dynamicFlavour?: DynamicFlavourSelector;
}

/**
 * @internal
 */
export interface ThemeColoursObject {
  [key: string]: ThemeColoursObject | string;
}
