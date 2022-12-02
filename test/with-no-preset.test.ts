import { test, expect } from 'vitest';
import { createGenerator } from 'unocss';

import { extendCatppuccin } from '../dist';

test('presetMini without setting variant', async () => {
  const uno = createGenerator({
    theme: {
      colors: extendCatppuccin(),
    },
  });

  const { css } = await uno.generate(
    [
      'text-latte-text',
      'dark:text-mocha-text',

      'light:bg-latte-base',
      'dark:bg-mocha-base',

      'border-frappe-pink/50',
      'hover:border-frappe-pink',

      'not-disabled:bg-macchiato-red',
      'disabled:bg-macchiato-red/25',

      'not-visited:bg-mocha-blue',
      'visited:bg-mocha-flamingo',
    ],
    { preflights: false }
  );

  expect(css).toBe('');
});

test('presetMini with default latte variant', async () => {
  const uno = createGenerator({
    theme: {
      colors: extendCatppuccin({
        variant: 'latte',
      }),
    },
  });

  const { css } = await uno.generate(
    [
      'text-text',
      'dark:text-text',

      'light:bg-base',
      'dark:bg-base',

      'border-pink/50',
      'hover:border-pink',

      'not-disabled:bg-red',
      'disabled:bg-red/25',

      'not-visited:bg-blue',
      'visited:bg-flamingo',
    ],
    { preflights: false }
  );

  expect(css).toBe('');
});
