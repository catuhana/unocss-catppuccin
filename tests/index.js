import { describe, test, it } from 'node:test';
import { inspect } from 'node:util';
import { ok, equal, deepEqual } from 'node:assert';

import { flavorEntries, flavors } from '@catppuccin/palette';

import { presetCatppuccin } from '../dist/index.mjs';

describe('`_extendTheme` with', () => {
  const expectedFlavourNames = Object.keys(flavors);

  function validateThemeBase(theme) {
    ok(theme, 'Theme should exist');
    ok(theme instanceof Object, 'Theme should be an object');
    deepEqual(
      Object.keys(theme),
      ['colors'],
      'Theme should have a key for colours',
    );
  }

  function getColourNames(flavour) {
    return Array.from(flavour.colorEntries).map(([name]) => name);
  }

  function testThemeConfiguration(extendOptions, validator) {
    const theme = {};

    describe(`with ${inspect(extendOptions)} options`, () => {
      it('produces correct theme structure', () => {
        presetCatppuccin(extendOptions).extendTheme(theme);
        validator(theme, extendOptions);
      });
    });

    return theme;
  }

  function validateFullFlavours(theme, { prefix }) {
    validateThemeBase(theme);

    const colourKey = prefix === false ? null : prefix || 'ctp';
    const baseColours = colourKey ? theme.colors[colourKey] : theme.colors;

    if (colourKey) {
      deepEqual(
        Object.keys(theme.colors),
        [colourKey],
        `Theme should have '${colourKey}' as its only colour key`,
      );
    }

    deepEqual(
      Object.keys(baseColours).sort(),
      expectedFlavourNames.sort(),
      'Theme colours should include all expected flavours',
    );

    for (const [flavourName, flavour] of flavorEntries) {
      const flavourColours = baseColours[flavourName];
      ok(
        flavourColours instanceof Object,
        `'${flavourName}' should be an object`,
      );

      const expectedColourNames = getColourNames(flavour);
      deepEqual(
        Object.keys(flavourColours).sort(),
        expectedColourNames.sort(),
        `Colours in '${flavourName}' should match expected colour names`,
      );
    }
  }

  function validateDefaultFlavour(theme, { prefix, defaultFlavour }) {
    validateThemeBase(theme);

    const flavour = Array.from(flavorEntries).find(
      ([name]) => name === defaultFlavour,
    )?.[1];

    ok(flavour, `${defaultFlavour} flavour should exist`);
    const expectedColourNames = getColourNames(flavour);

    if (prefix === false) {
      const themeColourKeys = Object.keys(theme.colors).filter(
        key => key !== 'ctp',
      );

      for (const colourName of expectedColourNames) {
        ok(
          themeColourKeys.includes(colourName)
            || theme.colors.ctp?.[colourName],
          `Colour ${colourName} should exist in 'theme.colors' or 'theme.colors.ctp'`,
        );
      }
    } else {
      const prefixKey = prefix || 'ctp';
      deepEqual(
        Object.keys(theme.colors[prefixKey]).sort(),
        expectedColourNames.sort(),
        `Colours should match expected ${defaultFlavour} colour names`,
      );
    }
  }

  testThemeConfiguration({ prefix: 'meow' }, validateFullFlavours);
  testThemeConfiguration({ prefix: false }, validateFullFlavours);
  testThemeConfiguration({}, validateFullFlavours);
  testThemeConfiguration(
    { prefix: 'meow', defaultFlavour: 'frappe' },
    validateDefaultFlavour,
  );
  testThemeConfiguration(
    { prefix: false, defaultFlavour: 'latte' },
    validateDefaultFlavour,
  );
  testThemeConfiguration(
    { defaultFlavour: 'macchiato' },
    validateDefaultFlavour,
  );
});

test("generated colours are accurate to Catppuccin's", () => {
  const theme = {};
  presetCatppuccin({}).extendTheme(theme);

  for (const [flavourName, flavour] of flavorEntries) {
    ok(
      theme.colors.ctp[flavourName] instanceof Object,
      `'${flavourName}' should be an object`,
    );

    for (const [colourName, colour] of flavour.colorEntries) {
      equal(
        theme.colors.ctp[flavourName][colourName],
        colour.hex,
        `'${flavourName}.${colourName}' should have correct hex value`,
      );
    }
  }
});

test("conflicting keys don't override existing keys", () => {
  const theme = { colors: { red: 'meow' } };
  presetCatppuccin({ prefix: false, defaultFlavour: 'mocha' }).extendTheme(
    theme,
  );

  equal(theme.colors.red, 'meow', 'Existing colour should not be overridden');
  ok(
    theme.colors.ctp?.red,
    'Catppuccin colour should be added under ctp prefix',
  );
});

test('handles existing ctp key correctly', () => {
  const theme = { colors: { ctp: { custom: 'value' } } };
  presetCatppuccin({}).extendTheme(theme);

  equal(
    theme.colors.ctp.custom,
    'value',
    'Existing ctp.custom should be preserved',
  );
  ok(theme.colors.ctp.mocha, 'Catppuccin mocha flavour should be added');
});
