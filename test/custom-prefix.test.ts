import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';

import { presetCatppuccin } from '../src';

test('Text colour with custom prefix', async () => {
  const uno = createGenerator({
    presets: [
      presetCatppuccin({
        prefix: 'catppuccin-',
      }),
    ],
  });

  const { css } = await uno.generate([
    'catppuccin-mocha-pink',
    'catppuccin-latte-mauve',
    'catppuccin-text-frappe-teal',
  ]);

  expect(css).toMatchSnapshot();
});

test('Text colour with complex custom prefix', async () => {
  const uno = createGenerator({
    presets: [
      presetCatppuccin({
        prefix: '(?:ctp-)$',
      }),
    ],
  });

  const { css } = await uno.generate([
    '(?:ctp-)$mocha-pink',
    '(?:ctp-)$latte-mauve',
    '(?:ctp-)$text-frappe-teal',
  ]);

  expect(css).toMatchSnapshot();
});
