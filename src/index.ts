import { _extendTheme, extendMode } from './extend/index.ts';

import type { Preset } from '@unocss/core';

import type { ExtendOptions } from './extend/types.ts';
import type { Mode, UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options of the preset.
 */
export default (options: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: 'unocss-catppuccin' };
  const mode = options.mode ?? extendMode();

  switch (mode.type) {
    case 'extend': {
      preset.extendTheme = _extendTheme(
        mode as ReturnType<Mode<'extend', ExtendOptions>>,
      );
      break;
    }
    default:
      throw new CatppuccinUnoCSSError(
        `Unsupported mode provided: '${options.mode}'`,
      );
  }

  return preset;
};

export { extendMode };

class CatppuccinUnoCSSError extends Error {
  constructor(message: string) {
    super(message);

    this.name = '[unocss-catppuccin] :: error :';
  }
}
