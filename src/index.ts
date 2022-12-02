import {
  variants as ctpVariants,
  labels as ctpLabels,
} from '@catppuccin/palette';

import type { ExtenderOptions } from './types';

export const extendCatppuccin = (options?: ExtenderOptions) => {
  const variant = options?.variant;

  if (variant && ctpVariants[variant]) {
    const colorsExtendedObject = {};
    Object.keys(ctpLabels).forEach(
      (label) => (colorsExtendedObject[label] = ctpLabels[label][variant].hex)
    );

    return colorsExtendedObject;
  } else {
    const colorsExtendedObject = {};
    for (const variant of Object.keys(ctpVariants)) {
      colorsExtendedObject[variant] = {};

      Object.keys(ctpLabels).forEach(
        (label) =>
          (colorsExtendedObject[variant][label] =
            ctpVariants[variant][label].hex)
      );
    }

    return colorsExtendedObject;
  }
};
