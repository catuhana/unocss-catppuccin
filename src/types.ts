import type { PresetOptions } from '@unocss/core';
import type { ExtendOptions } from './extend/types';

/** @see {@link UnoCSSCatppuccinOptions.mode} */
export type Modes = 'extend';

export interface UnoCSSCatppuccinOptions extends PresetOptions, ExtendOptions {
  /**
   * Which mode to use the preset with.
   *
   * `extend` mode will extend the `theme` object to add
   * Catppuccin colours. A preset with CSS utilities
   * (e.g. [Wind4 Preset](https://unocss.dev/presets/wind4))
   * MUST be used to be able to use the colours.
   *
   * @default 'extend'
   */
  mode?: Modes;
}
