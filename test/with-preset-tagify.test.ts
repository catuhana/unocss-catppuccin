import { test, expect } from 'vitest';
import { createGenerator, presetMini, presetTagify } from 'unocss';

import { extendCatppuccin } from '../dist';

test('presetMini + presetTagify without setting variant', async () => {
  const uno = createGenerator({
    presets: [
      presetMini({
        dark: 'media',
      }),
      presetTagify(),
    ],
    theme: {
      colors: extendCatppuccin(),
    },
  });

  const fixture = `
<text-mocha-flamingo>Hello world!</text-mocha-flamingo>
<text-frappe-pink>Hello world!</text-frappe-pink>
<text-macchiato-base>Hello world!</text-macchiato-base>
`;

  const { css } = await uno.generate(fixture, { preflights: false });

  expect(css).toMatchSnapshot();
});

test('presetMini + presetTagify with default latte variant', async () => {
  const uno = createGenerator({
    presets: [
      presetMini({
        dark: 'media',
      }),
      presetTagify(),
    ],
    theme: {
      colors: extendCatppuccin({
        variant: 'latte',
      }),
    },
  });

  const fixture = `
<text-flamingo>Hello world!</text-flamingo>
<text-pink>Hello world!</text-pink>
<text-base>Hello world!</text-base>
`;

  const { css } = await uno.generate(fixture, { preflights: false });

  expect(css).toMatchSnapshot();
});
