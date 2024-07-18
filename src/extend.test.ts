import { describe, it } from '@std/testing/bdd';
import { assert, assertEquals, assertInstanceOf } from '@std/assert';

import { _extendTheme } from './extend.ts';
import {
  type CatppuccinColors as CatppuccinColours,
  type CatppuccinFlavors as CatppuccinFlavours,
  flavorEntries as flavourEntries,
  flavors as flavours,
} from '@catppuccin/palette';

const CUSTOM_PREFIX = 'meow';

describe('extending theme with defaults results an object in required format', () => {
  const expectedFlavours = flavourEntries.map(([flavourName]) => flavourName);
  const expectedColours = flavours[expectedFlavours[0]].colorEntries.map(
    ([colourName]) => colourName,
  );

  it('with default prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        ctp: {
          [flavour in keyof CatppuccinFlavours]: {
            [colour in keyof CatppuccinColours]: string;
          };
        };
      }
    >;
    _extendTheme()(theme);

    assertInstanceOf(theme, Object);

    assertEquals(Object.keys(theme), ['colors']);
    assertEquals(Object.keys(theme.colors), ['ctp']);
    assertEquals(Object.keys(theme.colors.ctp), expectedFlavours);
    for (const flavour of expectedFlavours) {
      assertEquals(Object.keys(theme.colors.ctp[flavour]), expectedColours);
    }
  });

  it('without a prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        [flavour in keyof CatppuccinFlavours]: {
          [colour in keyof CatppuccinColours]: string;
        };
      }
    >;

    _extendTheme({ prefix: false })(theme);

    assertInstanceOf(theme, Object);

    assertEquals(Object.keys(theme), ['colors']);
    assertEquals(Object.keys(theme.colors), expectedFlavours);
    for (const flavour of expectedFlavours) {
      assertEquals(Object.keys(theme.colors[flavour]), expectedColours);
    }
  });

  it('with custom prefix', () => {
    const theme = {} as Record<
      'colors',
      {
        [CUSTOM_PREFIX]: {
          [flavour in keyof CatppuccinFlavours]: {
            [colour in keyof CatppuccinColours]: string;
          };
        };
      }
    >;

    _extendTheme({ prefix: CUSTOM_PREFIX })(theme);

    assertInstanceOf(theme, Object);

    assertEquals(Object.keys(theme), ['colors']);
    assertEquals(Object.keys(theme.colors), [CUSTOM_PREFIX]);
    assertEquals(Object.keys(theme.colors[CUSTOM_PREFIX]), expectedFlavours);
    for (const flavour of expectedFlavours) {
      assertEquals(
        Object.keys(theme.colors[CUSTOM_PREFIX][flavour]),
        expectedColours,
      );
    }
  });
});

describe("extending theme with 'defaultFlavour'", () => {
  const expectedFlavours = flavourEntries.map(([flavourName]) => flavourName);

  describe('results an object in required format', () => {
    for (const flavour of expectedFlavours) {
      const expectedColours = flavours[flavour].colorEntries.map(
        ([colourName]) => colourName,
      );

      describe(`with ${flavour} flavour`, () => {
        it('using default prefix', () => {
          const theme = {} as Record<
            'colors',
            {
              ctp: {
                [colour in keyof CatppuccinColours]: string;
              };
            }
          >;

          _extendTheme({ defaultFlavour: flavour })(theme);

          assertInstanceOf(theme, Object);

          assertEquals(Object.keys(theme), ['colors']);
          assertEquals(Object.keys(theme.colors), ['ctp']);
          assertEquals(Object.keys(theme.colors.ctp), expectedColours);
        });

        it(`without a prefix`, () => {
          const theme = {} as Record<
            'colors',
            {
              [colour in keyof CatppuccinColours]: string;
            }
          >;

          _extendTheme({ prefix: false, defaultFlavour: flavour })(theme);

          assertInstanceOf(theme, Object);

          assertEquals(Object.keys(theme), ['colors']);
          assertEquals(Object.keys(theme.colors), expectedColours);
        });

        it(`with custom prefix`, () => {
          const theme = {} as Record<
            'colors',
            {
              [CUSTOM_PREFIX]: {
                [colour in keyof CatppuccinColours]: string;
              };
            }
          >;

          _extendTheme({ prefix: CUSTOM_PREFIX, defaultFlavour: flavour })(
            theme,
          );

          assertInstanceOf(theme, Object);

          assertEquals(Object.keys(theme), ['colors']);
          assertEquals(Object.keys(theme.colors), [CUSTOM_PREFIX]);
          assertEquals(
            Object.keys(theme.colors[CUSTOM_PREFIX]),
            expectedColours,
          );
        });
      });
    }
  });
});

Deno.test('generated colours are accurate to Catppuccin', () => {
  const theme = {} as Record<
    'colors',
    {
      ctp: {
        [flavour in keyof CatppuccinFlavours]: {
          [colour in keyof CatppuccinColours]: string;
        };
      };
    }
  >;

  _extendTheme()(theme);

  for (const [flavourName, flavour] of flavourEntries) {
    assertInstanceOf(theme.colors.ctp[flavourName], Object);

    for (const [colourName, colour] of flavour.colorEntries) {
      assertEquals(theme.colors.ctp[flavourName][colourName], colour.hex);
    }
  }
});

Deno.test("conflicting keys don't override existing keys", () => {
  const theme = {
    colors: {
      red: 'meow',
    },
  } as Record<
    'colors',
    {
      [colour in keyof CatppuccinColours]: string;
    } & {
      ctp: {
        [colour in keyof CatppuccinColours]: string;
      };
    }
  >;

  _extendTheme({ defaultFlavour: 'frappe', prefix: false })(theme);

  assertEquals(theme.colors.red, 'meow');
  assert(theme.colors.ctp.red);
});
