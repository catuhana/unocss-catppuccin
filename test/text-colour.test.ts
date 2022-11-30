import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';

import { presetCatppuccin } from '../src';

const uno = createGenerator({
  presets: [presetCatppuccin()],
});

test('Text colour (variant -> label)', async () => {
  const { css } = await uno.generate([
    'ctp-mocha-pink',
    'ctp-latte-mauve',
    'ctp-text-frappe-teal',
  ]);

  expect(css).toMatchSnapshot();
});

test('Text colour (label -> variant)', async () => {
  const { css } = await uno.generate([
    'ctp-pink-mocha',
    'ctp-mauve-latte',
    'ctp-text-teal-frappe',
  ]);

  expect(css).toMatchSnapshot();
});
