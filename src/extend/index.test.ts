/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, test } from 'node:test';
import { ok, equal, deepEqual } from 'node:assert';

import { _extendTheme } from './index.ts';
import { FLAVOURS } from '../palette.ts';

import type { ExtendOptions } from './types.ts';
import type { FlavourName } from '../palette.ts';

describe('_extendTheme', () => {
  const expectedFlavourNames = Object.keys(FLAVOURS) as FlavourName[];
  const expectedColourNames = Object.keys(
    FLAVOURS.frappe,
  ) as (keyof (typeof FLAVOURS)['frappe'])[];

  const themeKeyOptions = [undefined, 'colors', 'customThemeKey'] as const;
  const prefixOptions = [undefined, 'ctp', 'customPrefix', false] as const;
  const defaultFlavourOptions = [undefined, ...expectedFlavourNames] as const;

  describe('option combinations', () => {
    for (const themeKey of themeKeyOptions) {
      for (const prefix of prefixOptions) {
        for (const defaultFlavour of defaultFlavourOptions) {
          const options: ExtendOptions = {};

          if (themeKey !== undefined) options.themeKey = themeKey;
          if (prefix !== undefined) options.prefix = prefix;
          if (defaultFlavour !== undefined)
            options.defaultFlavour = defaultFlavour;

          const optionDesc = Object.entries(options)
            .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
            .join(', ');

          test(`${optionDesc || 'default options'}`, () => {
            // TODO: Don't use any when first todo at index is
            // fixed.
            const theme: any = {};
            _extendTheme(options)(theme);
            validateTheme(theme, options);
          });
        }
      }
    }
  });

  test("conflicting keys don't override existing keys", () => {
    const theme: { colors: { red: string; ctp?: Record<string, string> } } = {
      colors: { red: 'meow' },
    };
    _extendTheme({ prefix: false, defaultFlavour: 'mocha' })(theme);

    equal(theme.colors.red, 'meow', 'Existing colour should not be overridden');
    ok(
      theme.colors.ctp?.['red'],
      'Catppuccin colour should be added under ctp prefix',
    );
  });

  test('handles existing ctp key correctly', () => {
    const theme: { colors: { ctp: { custom: string; mocha?: string } } } = {
      colors: { ctp: { custom: 'value' } },
    };
    _extendTheme({})(theme);

    equal(
      theme.colors.ctp.custom,
      'value',
      'Existing ctp.custom should be preserved',
    );
    ok(theme.colors.ctp.mocha, 'Catppuccin mocha flavour should be added');
  });

  test("generated colours are accurate to Catppuccin's palette", () => {
    const theme = {} as {
      colors: { ctp: Record<string, string | Record<string, string>> };
    };
    _extendTheme({})(theme);

    for (const [flavourName, flavour] of Object.entries(FLAVOURS)) {
      const themeFlavour = theme.colors.ctp[flavourName];
      ok(
        themeFlavour instanceof Object,
        `'${flavourName}' should be an object`,
      );

      for (const [colourName, colour] of Object.entries(flavour)) {
        equal(
          themeFlavour[colourName],
          colour,
          `'${flavourName}.${colourName}' should have correct hex value`,
        );
      }
    }
  });

  // TODO: Ditto.
  function validateTheme(theme: any, options: ExtendOptions) {
    const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

    ok(theme, 'Theme should exist');
    ok(theme[themeKey], `Theme should have a '${themeKey}' key`);

    const targetObj = theme[themeKey];
    const prefixContainer = prefix === false ? targetObj : targetObj[prefix];

    ok(
      prefixContainer,
      `Theme colours should exist${prefix === false ? '' : ` under '${prefix}' prefix`}`,
    );

    if (defaultFlavour) {
      validateFlavourColours(
        prefixContainer,
        FLAVOURS[defaultFlavour],
        prefix === false,
      );
    } else {
      for (const flavourName of expectedFlavourNames) {
        ok(
          prefixContainer[flavourName],
          `Flavour '${flavourName}' should exist in theme`,
        );

        validateFlavourStructure(prefixContainer[flavourName], flavourName);
      }
    }
  }

  function validateFlavourStructure(flavourObj: any, flavourName: string) {
    ok(flavourObj instanceof Object, `'${flavourName}' should be an object`);

    deepEqual(
      Object.keys(flavourObj).sort(),
      expectedColourNames.sort(),
      `Colours in '${flavourName}' should match expected colour names`,
    );

    for (const [colourName, colour] of Object.entries(
      FLAVOURS[flavourName as FlavourName],
    )) {
      equal(
        flavourObj[colourName],
        colour,
        `'${flavourName}.${colourName}' should have correct hex value`,
      );
    }
  }

  function validateFlavourColours(
    container: any,
    flavourColours: any,
    checkFallback: boolean,
  ) {
    for (const colourName of Object.keys(flavourColours)) {
      const colourValue =
        container[colourName] || (checkFallback && container.ctp?.[colourName]);

      ok(
        colourValue !== undefined,
        `Colour '${colourName}' should exist in theme`,
      );

      if (container[colourName]) {
        equal(
          container[colourName],
          flavourColours[colourName],
          `Colour '${colourName}' should have correct hex value`,
        );
      } else if (checkFallback && container.ctp?.[colourName]) {
        equal(
          container.ctp[colourName],
          flavourColours[colourName],
          `Fallback colour 'ctp.${colourName}' should have correct hex value`,
        );
      }
    }
  }
});
