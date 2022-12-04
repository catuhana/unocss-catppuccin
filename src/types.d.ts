type Variants = 'latte' | 'frappe' | 'macchiato' | 'mocha';

export interface ExtenderOptions {
  /**
   * Prefix for matching Catppuccin colours.
   *
   * @example
   * ```html
   * <!-- Let's say prefix is set as `ctp` -->
   * <p class='text-ctp-mocha-red'>Hello world!</p>
   * <p class='border-ctp-latte-base'>Hello world!</p>
   * ```
   *
   * @defaultValue `''`
   */
  prefix?: string;
  /**
   * Default variant for using Catppuccin colours
   * without specifying any variant.
   *
   * Note: This will override used preset's default colurs!
   * To escape from this behaviour, you can use {@link ExtenderOptions["prefix"]}
   * option in the {@link ExtenderOptions} object.
   *
   * @example
   * ```html
   * <p class='text-flamingo'>Hello world!</p>
   * <p class='bg-mauve'>Hello world!</p>
   * ```
   *
   * @defaultValue *none*
   */
  variant?: Variants;
}
