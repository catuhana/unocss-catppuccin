import { _extendTheme } from './extend.ts';

import type { Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';

// TODO: Fix docs
/**
 * Catppuccin preset for UnoCSS.
 *
 * @param options - Options for the preset.
 * @returns The UnoCSS preset object.
 */
export const presetCatppuccin = (
  options: UnoCSSCatppuccinOptions = { mode: 'extend' },
): Preset => {
  const preset: Preset = {
    name: 'unocss-catppuccin',
  };

  const { mode, prefix = 'ctp', defaultFlavour } = options;

  if (mode === 'extend') {
    preset.extendTheme = _extendTheme({ prefix, defaultFlavour });
  } else {
    // TODO: Custom logging?
    throw new Error(`Unsupported mode provided: \`${mode}\``);
  }

  return preset;
};
