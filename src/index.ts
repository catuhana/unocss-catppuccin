import { escapeRegExp } from '@unocss/core';
import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import { hexToRGBA } from './utils';

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
        new RegExp(
          `^${prefix}(?:text-)?${variantsCaptureGroup}-${labelsCaptureGroup}\/?(\\d*)?$`
        ),
        ([, variant, label, opacity]) => {
          const hexColor = ctpVariants[variant][label].hex;

          return {
            color: opacity
              ? `rgba(${hexToRGBA(hexColor, Number(opacity)).join(', ')})`
              : hexColor,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}(?:text-)?${labelsCaptureGroup}-${variantsCaptureGroup}\/?(\\d*)?$`
        ),
        ([, label, variant, opacity]) => {
          const hexColor = ctpLabels[label][variant].hex;

          return {
            color: opacity
              ? `rgba(${hexToRGBA(hexColor, Number(opacity)).join(', ')})`
              : hexColor,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}bg-${variantsCaptureGroup}-${labelsCaptureGroup}\/?(\\d*)?$`
        ),
        ([, variant, label, opacity]) => {
          const hexColor = ctpVariants[variant][label].hex;

          return {
            'background-color': opacity
              ? `rgba(${hexToRGBA(hexColor, Number(opacity)).join(', ')})`
              : hexColor,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}bg-${labelsCaptureGroup}-${variantsCaptureGroup}\/?(\\d*)?$`
        ),
        ([, label, variant, opacity]) => {
          const hexColor = ctpLabels[label][variant].hex;

          return {
            'background-color': opacity
              ? `rgba(${hexToRGBA(hexColor, Number(opacity)).join(', ')})`
              : hexColor,
          };
        },
      ],
    ],
  };
}
