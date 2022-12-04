import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import { capitalizeChar } from './utils';
import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  const prefix = options?.prefix ? options.prefix : false;
  const variantOption = options?.variant;

  const colorsExtendedObject = {};
  if (variantOption && ctpVariants[variantOption]) {
    for (const label of Object.keys(ctpLabels)) {
      const key = prefix ? `${prefix}${capitalizeChar(label)}` : label;

      colorsExtendedObject[key] = ctpLabels[label][variantOption].hex;
    }
  } else {
    for (const variant of Object.keys(ctpVariants)) {
      for (const label of Object.keys(ctpLabels)) {
        const key = prefix
          ? `${prefix}${capitalizeChar([variant, label]).join('')}`
          : `${variant}${capitalizeChar(label)}`;

        colorsExtendedObject[key] = ctpVariants[variant][label].hex;
      }
    }
  }

  return colorsExtendedObject;
};
