/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, test, type TestContext } from 'node:test';

import { _extendTheme } from './index.ts';
import { FLAVOURS } from '../palette.ts';

import type { ExtendOptions } from './types.ts';
import type { FlavourName } from '../palette.ts';

await describe('_extendTheme', async () => {
  const expectedFlavourNames = Object.keys(FLAVOURS) as FlavourName[];
  const expectedColourNames = Object.keys(
    FLAVOURS.frappe,
  ) as (keyof (typeof FLAVOURS)['frappe'])[];

  const themeKeyOptions = [undefined, 'colors', 'customThemeKey'] as const;
  const prefixOptions = [undefined, 'ctp', 'customPrefix', false] as const;
  const defaultFlavourOptions = [undefined, ...expectedFlavourNames] as const;

  await describe('option combinations', async () => {
    for (const themeKey of themeKeyOptions) {
      for (const prefix of prefixOptions) {
        for (const defaultFlavour of defaultFlavourOptions) {
          const options: ExtendOptions = {};

          if (themeKey !== undefined) options.themeKey = themeKey;
          if (prefix !== undefined) options.prefix = prefix;
          if (defaultFlavour !== undefined)
            options.defaultFlavour = defaultFlavour;

          const optionDescription = Object.entries(options)
            .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
            .join(', ');

          await test(optionDescription || 'default options', test => {
            // TODO: Don't use any when first todo at index is
            // fixed.
            const theme: any = {};
            _extendTheme(options)(theme);
            validateTheme(theme, options)(test);
          });
        }
      }
    }
  });

  await test("conflicting keys don't override existing keys", (test: TestContext) => {
    const theme: { colors: { red: string; ctp?: Record<string, string> } } = {
      colors: { red: 'meow' },
    };
    _extendTheme({ prefix: false, defaultFlavour: 'mocha' })(theme);

    test.assert.equal(
      theme.colors.red,
      'meow',
      'Existing colour should not be overridden',
    );
    test.assert.ok(
      theme.colors.ctp?.['red'],
      'Catppuccin colour should be added under ctp prefix',
    );
  });

  await test('handles existing ctp key correctly', (test: TestContext) => {
    const theme: { colors: { ctp: { custom: string; mocha?: string } } } = {
      colors: { ctp: { custom: 'value' } },
    };
    _extendTheme({})(theme);

    test.assert.equal(
      theme.colors.ctp.custom,
      'value',
      'Existing ctp.custom should be preserved',
    );
    test.assert.ok(
      theme.colors.ctp.mocha,
      'Catppuccin mocha flavour should be added',
    );
  });

  await test("generated colours are accurate to Catppuccin's palette", (test: TestContext) => {
    const theme = {} as {
      colors: { ctp: Record<string, string | Record<string, string>> };
    };
    _extendTheme({})(theme);

    for (const [flavourName, flavour] of Object.entries(FLAVOURS)) {
      const themeFlavour = theme.colors.ctp[flavourName];
      test.assert.ok(
        themeFlavour instanceof Object,
        `'${flavourName}' should be an object`,
      );

      for (const [colourName, colour] of Object.entries(flavour)) {
        test.assert.equal(
          themeFlavour[colourName],
          colour,
          `'${flavourName}.${colourName}' should have correct hex value`,
        );
      }
    }
  });

  // TODO: Ditto.
  function validateTheme(theme: any, options: ExtendOptions) {
    return (test: TestContext) => {
      const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

      test.assert.ok(theme, 'Theme should exist');
      test.assert.ok(theme[themeKey], `Theme should have a '${themeKey}' key`);

      const targetObj = theme[themeKey];
      const prefixContainer = prefix === false ? targetObj : targetObj[prefix];

      test.assert.ok(
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
          test.assert.ok(
            prefixContainer[flavourName],
            `Flavour '${flavourName}' should exist in theme`,
          );

          validateFlavourStructure(prefixContainer[flavourName], flavourName);
        }
      }
    };
  }

  function validateFlavourStructure(flavourObj: any, flavourName: string) {
    return (test: TestContext) => {
      test.assert.ok(
        flavourObj instanceof Object,
        `'${flavourName}' should be an object`,
      );

      test.assert.deepEqual(
        Object.keys(flavourObj).sort(),
        expectedColourNames.sort(),
        `Colours in '${flavourName}' should match expected colour names`,
      );

      for (const [colourName, colour] of Object.entries(
        FLAVOURS[flavourName as FlavourName],
      )) {
        test.assert.equal(
          flavourObj[colourName],
          colour,
          `'${flavourName}.${colourName}' should have correct hex value`,
        );
      }
    };
  }

  function validateFlavourColours(
    container: any,
    flavourColours: any,
    checkFallback: boolean,
  ) {
    return (test: TestContext) => {
      for (const colourName of Object.keys(flavourColours)) {
        const colourValue =
          container[colourName]
          ?? (checkFallback && container.ctp?.[colourName]);

        test.assert.ok(
          colourValue !== undefined,
          `Colour '${colourName}' should exist in theme`,
        );

        if (container[colourName]) {
          test.assert.equal(
            container[colourName],
            flavourColours[colourName],
            `Colour '${colourName}' should have correct hex value`,
          );
        } else if (checkFallback && container.ctp?.[colourName]) {
          test.assert.equal(
            container.ctp[colourName],
            flavourColours[colourName],
            `Fallback colour 'ctp.${colourName}' should have correct hex value`,
          );
        }
      }
    };
  }
});
