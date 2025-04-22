import { _extendTheme } from './extend/index.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options of the preset.
 */
export default (options: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: 'unocss-catppuccin' };

  switch (options.mode) {
    case 'extend': {
      const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;
      preset.extendTheme = _extendTheme({ prefix, themeKey, defaultFlavour });
      break;
    }
    default:
      throw new CatppuccinUnoCSSError(
        `Unsupported mode provided: '${options.mode}'`,
      );
  }

  return preset;
};

class CatppuccinUnoCSSError extends Error {
  constructor(message: string) {
    super(message);

    this.name = '[unocss-catppuccin] :: error :';
  }
}
