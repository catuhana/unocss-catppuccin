// TODO: Use the exported `palette` from the preset.
export const catppuccinFlavours = [
  'latte',
  'frappe',
  'macchiato',
  'mocha',
] as const;

export const catppuccinAccentColours = [
  'rosewater',
  'flamingo',
  'pink',
  'mauve',
  'red',
  'maroon',
  'peach',
  'yellow',
  'green',
  'teal',
  'sky',
  'sapphire',
  'blue',
  'lavender',
] as const;

export const catppuccinBaseColours = [
  'text',
  'subtext1',
  'subtext0',
  'overlay2',
  'overlay1',
  'overlay0',
  'surface2',
  'surface1',
  'surface0',
  'base',
  'mantle',
  'crust',
] as const;

export type CatppuccinFlavour = (typeof catppuccinFlavours)[number];
export type CatppuccinAccentColour = (typeof catppuccinAccentColours)[number];
export type CatppuccinBaseColour = (typeof catppuccinBaseColours)[number];
