import { describe, it } from '@std/testing/bdd';
import { assert, assertEquals, assertInstanceOf } from '@std/assert';

import { flavorEntries } from '@catppuccin/palette';

import { _extendTheme } from './extend.ts';

import type { CatppuccinColors, CatppuccinFlavors } from '@catppuccin/palette';

import type { ExtendOptions, Falsy } from './types.ts';

type ThemeObject<Options extends ExtendOptions> = Options extends
  { prefix: string; defaultFlavour?: undefined } ? {
    colors: {
      [prefix in Options['prefix']]: {
        [flavour in keyof CatppuccinFlavors]: {
          [colour in keyof CatppuccinColors]: string;
        };
      };
    };
  }
  : Options extends { prefix: Falsy; defaultFlavour?: undefined } ? {
      colors: {
        [flavour in keyof CatppuccinFlavors]: {
          [colour in keyof CatppuccinColors]: string;
        };
      };
    }
  : Options extends { prefix?: undefined; defaultFlavour?: undefined } ? {
      colors: {
        'ctp': {
          [flavour in keyof CatppuccinFlavors]: {
            [colour in keyof CatppuccinColors]: string;
          };
        };
      };
    }
  : Options extends { prefix: string; defaultFlavour: keyof CatppuccinFlavors }
    ? {
      colors: {
        [prefix in Options['prefix']]: {
          [colour in keyof CatppuccinColors]: string;
        };
      };
    }
  : Options extends { prefix: Falsy; defaultFlavour: keyof CatppuccinFlavors }
    ? {
      colors:
        & {
          [colour in keyof CatppuccinColors]?: string;
        }
        & {
          'ctp'?: {
            [colour in keyof CatppuccinColors]?: string;
          };
        };
    }
  : Options extends
    { prefix?: undefined; defaultFlavour: keyof CatppuccinFlavors } ? {
      colors: {
        'ctp': {
          [colour in keyof CatppuccinColors]: string;
        };
      };
    }
  : never;

describe('`_extendTheme` with', () => {
  const expectedFlavours = flavorEntries.map(([flavourName]) => flavourName);
  const expectedColours = flavorEntries[0][1].colorEntries.map((
    [colourName],
  ) => colourName);

  createExtendTestCases({ prefix: 'meow' }, [{
    description: 'results a correct object schema',
    validate: (theme, options) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), [options.prefix]);
      assertEquals(Object.keys(theme.colors[options.prefix]), expectedFlavours);

      for (const flavour of expectedFlavours) {
        assertEquals(
          Object.keys(theme.colors[options.prefix][flavour]),
          expectedColours,
        );
      }
    },
  }]);

  createExtendTestCases({ prefix: false }, [{
    description: 'results a correct object schema',
    validate: (theme) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), expectedFlavours);

      for (const flavour of expectedFlavours) {
        assertEquals(Object.keys(theme.colors[flavour]), expectedColours);
      }
    },
  }]);

  createExtendTestCases({}, [{
    description: 'results a correct object schema',
    validate: (theme) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), ['ctp']);
      assertEquals(Object.keys(theme.colors.ctp), expectedFlavours);

      for (const flavour of expectedFlavours) {
        assertEquals(Object.keys(theme.colors.ctp[flavour]), expectedColours);
      }
    },
  }]);

  createExtendTestCases({ prefix: 'meow', defaultFlavour: 'frappe' }, [{
    description: 'results a correct object schema',
    validate: (theme, options) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), [options.prefix]);
      assertEquals(Object.keys(theme.colors[options.prefix]), expectedColours);
    },
  }]);

  createExtendTestCases({ prefix: false, defaultFlavour: 'latte' }, [{
    description: 'results a correct object schema',
    validate: (theme) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), expectedColours);
    },
  }]);

  createExtendTestCases({ defaultFlavour: 'macchiato' }, [{
    description: 'results a correct object schema',
    validate: (theme) => {
      assert(theme);
      assertInstanceOf(theme, Object);

      assertEquals(Object.keys(theme), ['colors']);
      assertEquals(Object.keys(theme.colors), ['ctp']);
      assertEquals(Object.keys(theme.colors.ctp), expectedColours);
    },
  }]);

  function createExtendTestCases<
    P extends string,
    O extends ExtendOptions<P>,
  >(
    extendOptions: O,
    tests: {
      description: string;
      validate: (theme: ThemeObject<O>, extendOptions: O) => void;
    }[],
  ) {
    const theme = {} as ThemeObject<O>;

    describe(`with \`${Deno.inspect(extendOptions)}\` options`, () => {
      for (const test of tests) {
        it(test.description, () => {
          _extendTheme(extendOptions)(theme);

          test.validate(theme, extendOptions);
        });
      }
    });

    return theme;
  }
});

Deno.test("generated colours are accurate to Catppuccin's", () => {
  const options = {};
  const theme = {} as ThemeObject<typeof options>;

  _extendTheme(options)(theme);

  for (const [flavourName, flavour] of flavorEntries) {
    assertInstanceOf(theme.colors.ctp[flavourName], Object);

    for (const [colourName, colour] of flavour.colorEntries) {
      assertEquals(theme.colors.ctp[flavourName][colourName], colour.hex);
    }
  }
});

Deno.test("conflicting keys don't override existing keys", () => {
  const options = { prefix: false, defaultFlavour: 'mocha' } as const;
  const theme = { colors: { red: 'meow' } } as ThemeObject<typeof options>;

  _extendTheme(options)(theme);

  assertEquals(theme.colors.red, 'meow');
  assert(theme.colors.ctp?.red);
});
