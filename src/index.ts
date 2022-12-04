import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  const variantOption = options?.variant;

  const colorsExtendedObject = {};
  if (variantOption && ctpVariants[variantOption]) {
    for (const label of Object.keys(ctpLabels)) {
      colorsExtendedObject[label] = ctpLabels[label][variantOption].hex;
    }
  } else {
    for (const variant of Object.keys(ctpVariants)) {
      for (const label of Object.keys(ctpLabels)) {
        const key = `${variant}${
          label.charAt(0).toUpperCase() + label.slice(1)
        }`;

        colorsExtendedObject[key] = ctpVariants[variant][label].hex;
      }
    }
  }

  return colorsExtendedObject;
};
