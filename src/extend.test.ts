import { test, expect } from 'vitest';

import { extendTheme } from './extend.ts';
import {
  CatppuccinColors,
  CatppuccinFlavors,
  flavorEntries as flavourEntries,
  flavors as flavours,
} from '@catppuccin/palette';

test('extended theme results is an object', () => {
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

  const expectedFlavours = flavourEntries.map(([flavourName]) => flavourName);
  const expectedColours = flavours[expectedFlavours[0]].colorEntries.map(
    ([colourName]) => colourName
  );

  expect(theme).toBeTypeOf('object');

  expect(Object.keys(theme)).toEqual(['colors']);
  expect(Object.keys(theme.colors)).toEqual(['ctp']);
  expect(Object.keys(theme.colors.ctp)).toEqual(expectedFlavours);
  for (const flavour of expectedFlavours) {
    expect(Object.keys(theme.colors.ctp[flavour])).toEqual(expectedColours);
  }
});
