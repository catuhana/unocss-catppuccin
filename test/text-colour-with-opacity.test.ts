import { createGenerator } from '@unocss/core';
import { expect, test } from 'vitest';

import { presetCatppuccin } from '../src';

const uno = createGenerator({
  presets: [presetCatppuccin()],
});

test('Text colour with opacity (variant -> label)', async () => {
  const { css } = await uno.generate([
    'ctp-frappe-blue/50',
    'ctp-macchiato-lavender/699',
    'ctp-text-mocha-text/99',
  ]);

  expect(css).toMatchSnapshot();
});

test('Text colour with opacity (label -> variant)', async () => {
  const { css } = await uno.generate([
    'ctp-blue-frappe/50',
    'ctp-lavender-macchiato/699',
    'ctp-text-text-mocha/99',
  ]);

  expect(css).toMatchSnapshot();
});
