import { escapeRegExp } from '@unocss/core';
import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import { hexToRGBA } from './utils';

import type { Preset } from '@unocss/core';

interface PresetOptions {
  /**
   * Class prefix for matching Catppuccin colours.
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
          `^${prefix}(?:text-)?${variantsCaptureGroup}-${labelsCaptureGroup}(?:\/(\\d*))?$`
        ),
        ([, variant, label, opacity]) => {
          const hexColour = ctpVariants[variant][label].hex;

          return {
            color: opacity
              ? `rgba(${hexToRGBA(hexColour, Number(opacity)).join(', ')})`
              : hexColour,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}(?:text-)?${labelsCaptureGroup}-${variantsCaptureGroup}(?:\/(\\d*))?$`
        ),
        ([, label, variant, opacity]) => {
          const hexColour = ctpLabels[label][variant].hex;

          return {
            color: opacity
              ? `rgba(${hexToRGBA(hexColour, Number(opacity)).join(', ')})`
              : hexColour,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}(?:bg|background)-${variantsCaptureGroup}-${labelsCaptureGroup}(?:\/(\\d*))?$`
        ),
        ([, variant, label, opacity]) => {
          const hexColour = ctpVariants[variant][label].hex;

          return {
            'background-color': opacity
              ? `rgba(${hexToRGBA(hexColour, Number(opacity)).join(', ')})`
              : hexColour,
          };
        },
      ],
      [
        new RegExp(
          `^${prefix}(?:bg|background)-${labelsCaptureGroup}-${variantsCaptureGroup}(?:\/(\\d*))?$`
        ),
        ([, label, variant, opacity]) => {
          const hexColour = ctpLabels[label][variant].hex;

          return {
            'background-color': opacity
              ? `rgba(${hexToRGBA(hexColour, Number(opacity)).join(', ')})`
              : hexColour,
          };
        },
      ],
    ],
  };
}
