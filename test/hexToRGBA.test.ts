import { expect, test } from 'vitest';
import catppuccin from '@catppuccin/palette';

import { hexToRGBA } from '../src/utils';

test('HEX to RGBA', () => {
  const colors = [];
  Object.keys(catppuccin.variants).forEach((variant) => {
    colors.push(hexToRGBA(catppuccin.variants[variant].base.hex));
  });

  expect(colors).toMatchSnapshot();
});

test('HEX to RGBA with custom opacity', () => {
  const opacities = [15, 99, 1, 1709];
  const colors = [];
  Object.keys(catppuccin.variants).forEach((variant, index) => {
    colors.push(
      hexToRGBA(catppuccin.variants[variant].pink.hex, opacities[index])
    );
  });

  expect(colors).toMatchSnapshot();
});
