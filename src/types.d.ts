type Variants = 'latte' | 'frappe' | 'macchiato' | 'mocha';

export interface ExtenderOptions {
  /**
   * Prefix for matching Catppuccin colours.
   *
   * @example
   * ```html
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
