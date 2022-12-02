import { test, expect } from 'vitest';
import { createGenerator, presetMini, presetAttributify } from 'unocss';

import { extendCatppuccin } from '../dist';

test('presetMini + presetAttributify without setting variant', async () => {
  const uno = createGenerator({
    presets: [
      presetMini({
        dark: 'media',
      }),
      presetAttributify(),
    ],
    theme: {
      colors: extendCatppuccin(),
    },
  });

  const fixture = `
<body bg-latte-base dark:bg-mocha-base>
  <a text-mocha-violet hover:text-mocha-yellow>Hello world!</a>
  <input outline-frappe-base disabled:outline-mocha-base></input>
  <img border-macchiato-red/50 hover:border-macchiato-red></img>
</body>
`;

  const { css } = await uno.generate(fixture, { preflights: false });

  expect(css).toMatchSnapshot();
});

test('presetMini + presetAttributify with default mocha variant', async () => {
  const uno = createGenerator({
    presets: [
      presetMini({
        dark: 'media',
      }),
      presetAttributify(),
    ],
    theme: {
      colors: extendCatppuccin({
        variant: 'mocha',
      }),
    },
  });

  const fixture = `
  <body bg-base dark:bg-base>
    <a text-violet hover:text-yellow>Hello world!</a>
    <input outline-base disabled:outline-base></input>
    <img border-red/50 hover:border-red></img>
  </body>
  `;

  const { css } = await uno.generate(fixture, { preflights: false });

  expect(css).toMatchSnapshot();
});
