import { useMode, modeHsl, modeRgb, formatHex, interpolate } from 'culori/fn';

import { SHADE_RANGE } from './constants.ts';

import type { ColorFormat as ColourFormat } from '@catppuccin/palette';

useMode(modeHsl);
useMode(modeRgb);

export const generateShadePalette = (colour: ColourFormat) => {
  let resultObject = {} as Record<keyof typeof SHADE_RANGE | 'DEFAULT', string>;

  const colourShade = mapLightnessToShadeRange(colour.hsl.l * 100);

  const [lighten, darken] = SHADE_RANGE.reduce(
    ([lighten, darken], shade) => {
      if (shade < colourShade) {
        return [[...lighten, shade], darken];
      } else if (shade > colourShade) {
        return [lighten, [...darken, shade]];
      }
      return [lighten, darken];
    },
    [[], []] as number[][]
  );

  lighten.reverse().map((shade, i) => {
    resultObject[shade] ??= formatHex(
      interpolate(
        [colour.hex, 'white'],
        'hsl'
      )((i + 1) / (SHADE_RANGE.length - 1))
    );
  });
  darken.map((shade, i) => {
    resultObject[shade] ??= formatHex(
      interpolate(
        [colour.hex, 'black'],
        'hsl'
      )((i + 1) / (SHADE_RANGE.length - 1))
    );
  });

  resultObject['DEFAULT'] = resultObject[colourShade] = colour.hex;

  return resultObject;
};

function mapLightnessToShadeRange(lightness: number) {
  return SHADE_RANGE[
    Math.floor((100 - lightness) / (100 / SHADE_RANGE.length))
  ];
}
