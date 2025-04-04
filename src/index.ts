import { _extendTheme } from './extend.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options of the preset.
 */
export const presetCatppuccin = (options: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: 'unocss-catppuccin' };

  const {
    mode = 'extend',
    themeKey = 'colors',
    prefix = 'ctp',
    defaultFlavour,
  } = options;

  switch (mode) {
    case 'extend':
      preset.extendTheme = _extendTheme({ prefix, themeKey, defaultFlavour });
      break;
    default:
      // TODO: Custom logging?
      throw new Error(`Unsupported mode provided: '${mode}'`);
  }

  return preset;
};
