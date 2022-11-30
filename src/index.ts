import { escapeRegExp } from '@unocss/core';
import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import type { Preset } from '@unocss/core';

interface PresetOptions {
  /**
   * Class prefix for matching Catppuccin colors.
   * @default `ctp-`
   */
  prefix: string;
}

export function presetCatppuccin(options?: PresetOptions): Preset {
  const prefix = options?.prefix ? escapeRegExp(options.prefix) : 'ctp-';

  const variantsCaptureGroup = `(${Object.keys(ctpVariants).join('|')})`,
    labelsCaptureGroup = `(${Object.keys(ctpLabels).join('|')})`;

  return {
    name: 'unocss-preset-catppuccin-colors',
    rules: [
      [
        new RegExp(`^${prefix}${variantsCaptureGroup}-${labelsCaptureGroup}$`),
        ([, variant, label]) => {
          return {
            color: ctpVariants[variant][label].hex,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}bg-${variantsCaptureGroup}-${labelsCaptureGroup}$`
        ),
        ([, variant, label]) => {
          return {
            'background-color': ctpVariants[variant][label].hex,
          };
        },
      ],
    ],
  };
}
