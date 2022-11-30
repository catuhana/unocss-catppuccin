import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';

import { presetCatppuccin } from '../src';

const uno = createGenerator({
  presets: [presetCatppuccin()],
});

test('Background colour (variant -> label)', async () => {
  const { css } = await uno.generate([
    'ctp-bg-mocha-pink',
    'ctp-background-latte-mauve',
    'ctp-bg-frappe-teal',
  ]);

  expect(css).toMatchSnapshot();
});

test('Background colour (label -> variant)', async () => {
  const { css } = await uno.generate([
    'ctp-bg-pink-mocha',
    'ctp-background-mauve-latte',
    'ctp-bg-teal-frappe',
  ]);

  expect(css).toMatchSnapshot();
});
