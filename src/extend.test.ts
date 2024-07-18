import { test, expect, describe } from 'vitest';

import { extendTheme } from './extend.ts';
import {
  CatppuccinColors,
  CatppuccinFlavors,
  flavorEntries as flavourEntries,
  flavors as flavours,
} from '@catppuccin/palette';

describe('extending theme with defaults results an object in required format', () => {
  const expectedFlavours = flavourEntries.map(([flavourName]) => flavourName);
  const expectedColours = flavours[expectedFlavours[0]].colorEntries.map(
    ([colourName]) => colourName
  );

  test('with default prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        ctp: {
          [flavour in keyof CatppuccinFlavors]: {
            [colour in keyof CatppuccinColors]: string;
          };
        };
      }
    >;
    extendTheme()(theme);

    expect(theme).toBeTypeOf('object');

    expect(Object.keys(theme)).toEqual(['colors']);
    expect(Object.keys(theme.colors)).toEqual(['ctp']);
    expect(Object.keys(theme.colors.ctp)).toEqual(expectedFlavours);
    for (const flavour of expectedFlavours) {
      expect(Object.keys(theme.colors.ctp[flavour])).toEqual(expectedColours);
    }
  });

  test('without a prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        [flavour in keyof CatppuccinFlavors]: {
          [colour in keyof CatppuccinColors]: string;
        };
      }
    >;

    extendTheme({ prefix: false })(theme);

    expect(theme).toBeTypeOf('object');

    expect(Object.keys(theme)).toEqual(['colors']);
    expect(Object.keys(theme.colors)).toEqual(expectedFlavours);
    for (const flavour of expectedFlavours) {
      expect(Object.keys(theme.colors[flavour])).toEqual(expectedColours);
    }
  });

  test('with custom prefix', () => {
    const prefix = 'meow';
    const theme = {} as Record<
      'colors',
      {
        [prefix]: {
          [flavour in keyof CatppuccinFlavors]: {
            [colour in keyof CatppuccinColors]: string;
          };
        };
      }
    >;

    extendTheme({ prefix })(theme);

    expect(theme).toBeTypeOf('object');

    expect(Object.keys(theme)).toEqual(['colors']);
    expect(Object.keys(theme.colors)).toEqual([prefix]);
    expect(Object.keys(theme.colors[prefix])).toEqual(expectedFlavours);
    for (const flavour of expectedFlavours) {
      expect(Object.keys(theme.colors[prefix][flavour])).toEqual(
        expectedColours
      );
    }
  });
});
