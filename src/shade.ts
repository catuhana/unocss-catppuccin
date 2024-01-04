import { useMode, modeLch, modeRgb, formatHex, interpolate } from 'culori/fn';

import type { ColorFormat as ColourFormat } from '@catppuccin/palette';

const INTERPOLATION_MAP = {
  50: 0.85,
  100: 0.7,
  200: 0.55,
  300: 0.35,
  400: 0.25,
  500: 0.15,
  600: 0.2,
  700: 0.3,
  800: 0.45,
  900: 0.55,
  950: 0.7,
} as const;

useMode(modeLch);
useMode(modeRgb);

export const generateShadePalette = (colour: ColourFormat) => {
  const resultObject = {} as Record<
    keyof typeof INTERPOLATION_MAP | 'DEFAULT',
    string
  >;

  ([50, 100, 200, 300, 400, 500] as const).forEach((level) => {
    resultObject[level] ??= formatHex(
      interpolate([colour.hex, 'white'], 'lch')(INTERPOLATION_MAP[level])
    );
  });

  ([600, 700, 800, 900, 950] as const).forEach(
    (level) =>
      (resultObject[level] = formatHex(
        interpolate([colour.hex, 'black'], 'lch')(INTERPOLATION_MAP[level])
      ))
  );

  return resultObject;
};
