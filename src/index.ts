import { _extendTheme } from './extend/index.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options of the preset.
 */
export default ({ mode = 'extend', ...rest }: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: 'unocss-catppuccin' };

  switch (mode) {
    case 'extend': {
      preset.extendTheme = _extendTheme(rest);
      break;
    }
    default:
      throw new CatppuccinUnoCSSError(
        `Unsupported mode provided: '${String(mode)}'`,
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
