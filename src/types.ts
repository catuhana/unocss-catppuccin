import type { PresetOptions } from '@unocss/core';

export type Mode<
  Type extends string = string,
  Options extends object = object,
> = (options?: Options) => Options & { type: Type };

/**
 * Base options for the preset.
 */
export interface UnoCSSCatppuccinOptions extends PresetOptions {
  mode?: ReturnType<Mode>;
}
