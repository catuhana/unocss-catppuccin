import type { PresetOptions } from '@unocss/core';
import type { ExtendOptions } from './extend/types';

/**
 * Available modes for this preset.
 */
export type Modes = 'extend';

type ModeConfig<T extends Modes | undefined, U = never> =
  T extends Modes ?
    {
      /**
       * Which mode to use this preset with.
       *
       * `extend` mode will extend the `theme` object to add
       * Catppuccin colours. A preset with CSS utilities
       * (e.g. [Wind4 Preset](https://unocss.dev/presets/wind4))
       * MUST be used to be able to use the colours.
       *
       * @see {@link ModeConfig.mode}
       *
       * @default 'extend'
       */
      mode: T;
    } & U
  : { mode?: undefined };

type ModeOptions<T extends Modes | undefined> =
  T extends 'extend' ? ModeConfig<T, ExtendOptions> : ModeConfig<T>;

export type UnoCSSCatppuccinOptions = PresetOptions
  & (ModeOptions<'extend'> | ModeOptions<undefined>);
