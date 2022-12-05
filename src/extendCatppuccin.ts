import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';
import { capitalizeChar } from './utils';

import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  return generateColoursObject(options);
};

function generateColoursObject(options?: ExtenderOptions) {
  const prefix = options?.prefix;
  const variant = options?.variant;

  const coloursObject = {};
  if (variant && ctpVariants[variant]) {
    for (const label of Object.keys(ctpLabels)) {
      const key = prefix ? `${prefix}${capitalizeChar(label)}` : label;
      coloursObject[key] = ctpLabels[label][variant].hex;
    }
  } else {
    for (const variant of Object.keys(ctpVariants)) {
      for (const label of Object.keys(ctpLabels)) {
        const key = prefix
          ? `${prefix}${capitalizeChar([variant, label]).join('')}`
          : `${variant}${capitalizeChar(label)}`;

        coloursObject[key] = ctpVariants[variant][label].hex;
      }
    }
  }

  return coloursObject;
}
