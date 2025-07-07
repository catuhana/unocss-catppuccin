export const FLAVOUR_NAMES = ['latte', 'frappe', 'macchiato', 'mocha'] as const;
export const FLAVOUR_NAMES_PRETTY = [
  'Latte',
  'Frappé',
  'Macchiato',
  'Mocha',
] as const;
export const FLAVOUR_EMOJIS = ['🌻', '🪴', '🌺', '🌿'] as const;

export const ACCENT_COLOUR_NAMES = [
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
export const NEUTRAL_COLOUR_NAMES = [
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

export type FlavourEmoji = (typeof FLAVOUR_EMOJIS)[number];
