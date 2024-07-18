import { test, expect, describe } from 'vitest';

import { _extendTheme } from './extend.ts';
import {
  type CatppuccinColors,
  type CatppuccinFlavors,
  flavorEntries as flavourEntries,
  flavors as flavours,
} from '@catppuccin/palette';

const CUSTOM_PREFIX = 'meow';

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
    _extendTheme()(theme);

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

    _extendTheme({ prefix: false })(theme);

    expect(theme).toBeTypeOf('object');

    expect(Object.keys(theme)).toEqual(['colors']);
    expect(Object.keys(theme.colors)).toEqual(expectedFlavours);
    for (const flavour of expectedFlavours) {
      expect(Object.keys(theme.colors[flavour])).toEqual(expectedColours);
    }
  });

  test('with custom prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        [CUSTOM_PREFIX]: {
          [flavour in keyof CatppuccinFlavors]: {
            [colour in keyof CatppuccinColors]: string;
          };
        };
      }
    >;

    _extendTheme({ prefix: CUSTOM_PREFIX })(theme);

    expect(theme).toBeTypeOf('object');

    expect(Object.keys(theme)).toEqual(['colors']);
    expect(Object.keys(theme.colors)).toEqual([CUSTOM_PREFIX]);
    expect(Object.keys(theme.colors[CUSTOM_PREFIX])).toEqual(expectedFlavours);
    for (const flavour of expectedFlavours) {
      expect(Object.keys(theme.colors[CUSTOM_PREFIX][flavour])).toEqual(
        expectedColours
      );
    }
  });
});

describe("extending theme with 'defaultFlavour'", () => {
  const expectedFlavours = flavourEntries.map(([flavourName]) => flavourName);

  describe('results an object in required format', () => {
    for (const flavour of expectedFlavours) {
      const expectedColours = flavours[flavour].colorEntries.map(
        ([colourName]) => colourName
      );

      describe(`with ${flavour} flavour`, () => {
        test('using default prefix', () => {
          const theme = {} as Record<
            'colors',
            {
              ctp: {
                [colour in keyof CatppuccinColors]: string;
              };
            }
          >;

          _extendTheme({ defaultFlavour: flavour })(theme);

          expect(theme).toBeTypeOf('object');

          expect(Object.keys(theme)).toEqual(['colors']);
          expect(Object.keys(theme.colors)).toEqual(['ctp']);
          expect(Object.keys(theme.colors.ctp)).toEqual(expectedColours);
        });

        test(`without a prefix`, () => {
          const theme = {} as Record<
            'colors',
            {
              [colour in keyof CatppuccinColors]: string;
            }
          >;

          _extendTheme({ prefix: false, defaultFlavour: flavour })(theme);

          expect(theme).toBeTypeOf('object');

          expect(Object.keys(theme)).toEqual(['colors']);
          expect(Object.keys(theme.colors)).toEqual(expectedColours);
        });

        test(`with custom prefix`, () => {
          const theme = {} as Record<
            'colors',
            {
              [CUSTOM_PREFIX]: {
                [colour in keyof CatppuccinColors]: string;
              };
            }
          >;

          _extendTheme({ prefix: CUSTOM_PREFIX, defaultFlavour: flavour })(
            theme
          );

          expect(theme).toBeTypeOf('object');

          expect(Object.keys(theme)).toEqual(['colors']);
          expect(Object.keys(theme.colors)).toEqual([CUSTOM_PREFIX]);
          expect(Object.keys(theme.colors[CUSTOM_PREFIX])).toEqual(
            expectedColours
          );
        });
      });
    }
  });
});

test('generated colours are accurate to Catppuccin', () => {
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

  _extendTheme()(theme);

  for (const [flavourName, flavour] of flavourEntries) {
    expect(theme.colors.ctp[flavourName]).toBeTypeOf('object');

    for (const [colourName, colour] of flavour.colorEntries) {
      expect(theme.colors.ctp[flavourName][colourName]).toBe(colour.hex);
    }
  }
});

test("conflicting keys don't override existing keys", () => {
  const theme = {
    colors: {
      red: 'meow',
    },
  } as Record<
    'colors',
    {
      [colour in keyof CatppuccinColors]: string;
    } & {
      ctp: {
        [colour in keyof CatppuccinColors]: string;
      };
    }
  >;

  _extendTheme({ defaultFlavour: 'frappe', prefix: false })(theme);

  expect(theme.colors.red).toBe('meow');
  expect(theme.colors.ctp.red);
});
