import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';
import { capitalizeChar } from './utils';

import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  const prefixOption = options?.prefix;
  const variantOption = options?.variant;

  const coloursObject = {};
  if (variantOption && ctpVariants[variantOption]) {
    for (const label of Object.keys(ctpLabels)) {
      const key = prefixOption
        ? `${prefixOption}${capitalizeChar(label)}`
        : label;

      coloursObject[key] = ctpLabels[label][variantOption].hex;
    }
  } else {
    for (const variant of Object.keys(ctpVariants)) {
      for (const label of Object.keys(ctpLabels)) {
        const key = prefixOption
          ? `${prefixOption}${capitalizeChar([variant, label]).join('')}`
          : `${variant}${capitalizeChar(label)}`;

        coloursObject[key] = ctpVariants[variant][label].hex;
      }
    }
  }

  return coloursObject;
};
