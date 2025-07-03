import { _extendTheme } from './extend/index.ts';

import { type Preset } from '@unocss/core';

import type { UnoCSSCatppuccinOptions } from './types.ts';
import {
  ACCENT_COLOUR_NAMES,
  COLOURS,
  FLAVOUR_EMOJIS,
  FLAVOUR_NAMES,
  FLAVOUR_NAMES_PRETTY,
  NEUTRAL_COLOUR_NAMES,
} from './palette.ts';
import type { DynamicFlavourSelector } from './extend/types.ts';

/**
 * Catppuccin preset for UnoCSS.
 */
export default ({ mode, ...options }: UnoCSSCatppuccinOptions = {}) => {
  const preset: Preset = { name: 'unocss-catppuccin' };

  switch (mode) {
    case 'extend':
    case undefined: {
      if (options.defaultFlavour && options.dynamicFlavour)
        throw new CatppuccinUnoCSSError(
          'You cannot use `defaultFlavour` and `dynamicFlavour` at the same time.',
        );

      if (options.dynamicFlavour) {
        if (!preset.preflights) preset.preflights = [];

        preset.preflights.push({
          getCSS: () => {
            return FLAVOUR_NAMES.map((flavour, index) => {
              const flavourAliases = [
                flavour,
                FLAVOUR_NAMES_PRETTY[index],
                FLAVOUR_EMOJIS[index],
              ];

              const selectors = figureDynamicFlavour(
                options.dynamicFlavour ?? '[data-theme]',
                flavourAliases as string[],
              );
              if (!selectors) return '';

              const allColours = [
                ...ACCENT_COLOUR_NAMES,
                ...NEUTRAL_COLOUR_NAMES,
              ];
              const cssVariables = allColours
                .map(
                  colourName =>
                    `  --ctp-${colourName}: ${COLOURS[flavour][colourName]};`,
                )
                .join('\n');

              return `${Array.isArray(selectors) ? selectors.join(',') : selectors} {\n${cssVariables}\n}`;
            }).join('\n\n');
          },
        });
      }

      preset.extendTheme = _extendTheme(options);
      break;
    }
    default:
      throw new CatppuccinUnoCSSError(
        `unsupported mode provided: '${String(mode)}'`,
      );
  }

  return preset;
};

class CatppuccinUnoCSSError extends Error {
  constructor(message: string) {
    super(message);

    this.name = '[unocss-catppuccin] :: error :';
  }
}

function figureDynamicFlavour(
  input: DynamicFlavourSelector,
  possibleAttributeValues?: string[],
) {
  if (!(typeof input === 'string')) return;
  if (!possibleAttributeValues) return;

  if (input.startsWith('[') && input.endsWith(']')) {
    const attribute = input.slice(1, -1);

    return possibleAttributeValues
      .map(attributeValue => `html[${attribute}="${attributeValue}"]`)
      .join(',');
  } else if (input.endsWith('.')) {
    return possibleAttributeValues.map(
      attributeValue => `html.${attributeValue}`,
    );
  } else if (input.endsWith('#')) {
    return possibleAttributeValues.map(
      attributeValue => `html#${attributeValue}`,
    );
  }

  return input;
}
