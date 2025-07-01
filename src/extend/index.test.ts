import { suite, test, type TestContext } from 'node:test';

import { _extendTheme } from './index.ts';
import {
  COLOURS,
  FLAVOUR_NAMES,
  ACCENT_COLOUR_NAMES,
  NEUTRAL_COLOUR_NAMES,
} from '../palette.ts';

import type { ExtendOptions, ThemeColoursObject } from './types.ts';
import type { FlavourName } from '../palette.ts';

await suite('_extendTheme', async () => {
  const themeKeyOptions = [undefined, 'colors', 'tones'] as const;
  const prefixOptions = [undefined, 'ctp', 'meow', false] as const;
  const defaultFlavourOptions = [undefined, ...FLAVOUR_NAMES] as const;

  await suite('option combinations', async () => {
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
            const theme = {};
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

    for (const [flavourName, flavour] of Object.entries(COLOURS)) {
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

  function validateTheme(theme: ThemeColoursObject, options: ExtendOptions) {
    return (test: TestContext) => {
      const { themeKey = 'colors', prefix = 'ctp', defaultFlavour } = options;

      test.assert.ok(theme, 'Theme should exist');
      test.assert.ok(theme[themeKey], `Theme should have a '${themeKey}' key`);

      const targetObj = theme[themeKey] as ThemeColoursObject;
      const prefixContainer = (
        prefix === false ? targetObj : targetObj[prefix]) as ThemeColoursObject;

      test.assert.ok(
        prefixContainer,
        `Theme colours should exist${prefix === false ? '' : ` under '${prefix}' prefix`}`,
      );

      if (defaultFlavour) {
        validateFlavourColours(
          prefixContainer,
          COLOURS[defaultFlavour],
          prefix === false,
        );
      } else {
        for (const flavourName of FLAVOUR_NAMES) {
          test.assert.ok(
            prefixContainer[flavourName],
            `Flavour '${flavourName}' should exist in theme`,
          );

          validateFlavourStructure(
            prefixContainer[flavourName] as ThemeColoursObject,
            flavourName,
          );
        }
      }
    };
  }

  function validateFlavourStructure(
    flavourObj: ThemeColoursObject,
    flavourName: string,
  ) {
    return (test: TestContext) => {
      test.assert.ok(
        flavourObj instanceof Object,
        `'${flavourName}' should be an object`,
      );

      test.assert.deepEqual(
        Object.keys(flavourObj).sort(),
        [...ACCENT_COLOUR_NAMES, ...NEUTRAL_COLOUR_NAMES].sort(),
        `Colours in '${flavourName}' should match expected colour names`,
      );

      for (const [colourName, colour] of Object.entries(
        COLOURS[flavourName as FlavourName],
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
    container: ThemeColoursObject,
    flavourColours: ThemeColoursObject,
    checkFallback: boolean,
  ) {
    return (test: TestContext) => {
      for (const colourName of Object.keys(flavourColours)) {
        const colourValue =
          container[colourName]
          ?? (checkFallback
            && (container['ctp'] as ThemeColoursObject)[colourName]);

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
        } else if (
          checkFallback
          && (container['ctp'] as ThemeColoursObject)[colourName]
        ) {
          test.assert.equal(
            (container['ctp'] as ThemeColoursObject)[colourName],
            flavourColours[colourName],
            `Fallback colour 'ctp.${colourName}' should have correct hex value`,
          );
        }
      }
    };
  }
});
