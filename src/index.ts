import { _extendTheme } from './extend/index.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options for the preset
 *
 * @example
 * ```ts
 * // uno.config.ts
 * import { presetWind4, defineConfig } from 'unocss';
 * import presetCatppuccin from '@catppuccin/unocss';
 *
 * export default defineConfig({
 *   presets: [
 *     presetWind4(),
 *     presetCatppuccin({
 *       // options
 *     })
 *   ]
 * });
 * ```
 *
 * @see {@link https://unocss.catppuccin.com/docs} for documentation.
 */
export default ({ mode, ...rest }: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: '@catppuccin/unocss' };

  switch (mode) {
    case 'extend':
    case undefined: {
      preset.extendTheme = _extendTheme(rest);
      break;
    }
    default:
      throw new CatppuccinUnoCSSError(
        `unsupported mode provided: '${String(mode)}'`,
      );
  }

  return preset;
};

class CatppuccinUnoCSSError extends Error {
  constructor(message: string) {
    super(message);

    this.name = '[@catppuccin/unocss] :: error :';
  }
}
