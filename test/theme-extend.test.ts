import { describe, expect, test } from 'vitest';
import { createGenerator, presetMini } from 'unocss';

import { extendCatppuccin } from '../dist';

describe('Catppuccin colours with theme extender using presetMini', () => {
  test('and without default variant', async () => {
    const uno = createGenerator({
      presets: [
        presetMini({
          dark: 'media',
        }),
      ],
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

    expect(css).toMatchSnapshot();
  });

  test('and with default macchiato variant', async () => {
    const uno = createGenerator({
      presets: [
        presetMini({
          dark: 'media',
        }),
      ],
      theme: {
        colors: extendCatppuccin({
          variant: 'macchiato',
        }),
      },
    });

    const { css: generatedCSS } = await uno.generate(
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
      ),
      { css: blankCSS } = await uno.generate(
        [
          'text-latte-text',
          'dark:text-mocha-text',

          'light:bg-latte-base',
          'dark:bg-mocha-base',
        ],
        { preflights: false }
      );

    expect(generatedCSS).toMatchSnapshot();
    expect(blankCSS).toBe('');
  });

  describe('and with custom prefix', () => {
    test('without default variant', async () => {
      const uno = createGenerator({
        presets: [
          presetMini({
            dark: 'media',
          }),
        ],
        theme: {
          colors: extendCatppuccin({
            prefix: 'ctp',
          }),
        },
      });

      const { css: generatedCSS } = await uno.generate(
          [
            'text-ctp-latte-text',
            'dark:text-ctp-mocha-text',

            'light:bg-ctp-latte-base',
            'dark:bg-ctp-mocha-base',

            'border-ctp-frappe-pink/50',
            'hover:border-ctp-frappe-pink',

            'not-disabled:bg-ctp-macchiato-red',
            'disabled:bg-ctp-macchiato-red/25',

            'not-visited:bg-ctp-mocha-blue',
            'visited:bg-ctp-mocha-flamingo',
          ],
          { preflights: false }
        ),
        { css: blankCSS } = await uno.generate(
          [
            'text-latte-text',
            'dark:text-mocha-text',

            'light:bg-latte-base',
            'dark:bg-mocha-base',

            'text-ctp-mauve',
            'bg-ctp-surface0',
          ],
          { preflights: false }
        );

      expect(generatedCSS).toMatchSnapshot();
      expect(blankCSS).toBe('');
    });
  });
});
