export const capitalizeChar = <T extends string | string[]>(
  input: T,
  index = 0
): T => {
  if (typeof input === 'string')
    return (input.charAt(index).toUpperCase() + input.slice(index + 1)) as T;
  else if (Array.isArray(input)) {
    const results: string[] = [];
    for (const text of input) {
      results.push(text.charAt(index).toUpperCase() + text.slice(index + 1));
    }

    return results as T;
  }
};
