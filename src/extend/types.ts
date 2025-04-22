import type { FlavourName } from '../palette.ts';

/**
 * Options for the internal `_extendTheme` function.
 */
export interface ExtendOptions {
  themeKey?: string | undefined;
  prefix?: string | false;
  defaultFlavour?: FlavourName | undefined;
}
