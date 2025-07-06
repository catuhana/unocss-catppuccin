import { _extendTheme } from './extend/index.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
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
