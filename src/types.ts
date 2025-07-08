import type { PresetOptions } from '@unocss/core';
import type { ExtendOptions } from './extend/types';

/**
 * Available modes for this preset.
 */
export type Modes = 'extend';

/**
 * Options for a specific mode.
 *
 * @template T - The mode name or `undefined`
 * @template U - Options object for the specified mode
 * in `T`.
 *
 * @internal
 */
export type ModeOptions<T extends Modes | undefined, U = never> =
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
       * @see {@link Modes}
       *
       * @default 'extend'
       */
      mode: T;
    } & U
  : { mode?: undefined };

/**
 * Resolved options type based on the mode.
 *
 * @template T - The mode name or `undefined`
 *
 * @internal
 */
export type ResolvedModeOptions<T extends Modes | undefined> =
  T extends 'extend' ? ModeOptions<T, ExtendOptions> : ModeOptions<T>;

/**
 * Options for this preset.
 */
export type UnoCSSCatppuccinOptions = PresetOptions
  & (ResolvedModeOptions<'extend'> | ResolvedModeOptions<undefined>);
