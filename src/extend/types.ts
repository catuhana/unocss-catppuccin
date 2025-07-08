import type { FlavorName } from '@catppuccin/palette';

export interface ExtendOptions {
  /**
   * Which `theme` object key to add the colours to.
   *
   * Some presets may use different keys to put things
   * under, such as `colours` or `shades`. Defaults
   * to what `presetWind4` uses.
   *
   * @default 'colors'
   */
  themeKey?: string;

  /**
   * Prefix for using Catppuccin colours.
   *
   * When set to `false`, the prefix is removed and
   * colours are added directly. If a Catppuccin colour
   * conflicts with another preset's colour, former will
   * be prefixed under `ctp` instead of overriding.
   *
   * @example
   * ```html
   * <!-- Default prefix is `'ctp'`: -->
   * <p class='text-ctp-mocha-red'>Hello world!</p>
   * <!-- If it's set to `false`: -->
   * <p class='text-mocha-red'>Hello world!</p>
   * <!-- If `mocha` is included in another preset,
   *      Catppuccin colour will be prefixed. -->
   * <p class='text-ctp-mocha-red'>Hello world!</p>
   * ```
   *
   * @default 'ctp'
   */
  prefix?: string | false;

  /**
   * Default flavour to use colours from.
   *
   * ```html
   * <!-- If `defaultFlavour` is set to 'latte': -->
   * <p class='text-ctp-rosewater'>Hello world!</p>
   * <!-- If `prefix` option is false too: -->
   * <p class='text-rosewater'>Hello world!</p>
   * <!-- If `red` is included in another preset,
   *      it will be prefixed, as explained in `prefix`. -->
   * <p class='text-ctp-red'>Hello world!</p>
   * ```
   */
  defaultFlavour?: FlavorName;
}
