export const hexToRGBA = (hex: string, opacity = 100) => {
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (opacity > 100) opacity = 100;

  const split = hex.match(/.{1,2}/g)!;

  return [
    parseInt(split[0], 16),
    parseInt(split[1], 16),
    parseInt(split[2], 16),
    opacity / 100,
  ];
};
