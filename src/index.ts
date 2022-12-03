import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  const variantOption = options?.variant;

  if (variantOption && ctpVariants[variantOption]) {
    const colorsExtendedObject = {};
    Object.keys(ctpLabels).forEach(
      (label) =>
        (colorsExtendedObject[label] = ctpLabels[label][variantOption].hex)
    );

    return colorsExtendedObject;
  } else {
    const colorsExtendedObject = {};
    Object.keys(ctpVariants).forEach((variant) =>
      Object.keys(ctpLabels).forEach((label) => {
        const key = `${variant}${
          label.charAt(0).toUpperCase() + label.slice(1)
        }`;

        colorsExtendedObject[key] = ctpVariants[variant][label].hex;
      })
    );

    return colorsExtendedObject;
  }
};
