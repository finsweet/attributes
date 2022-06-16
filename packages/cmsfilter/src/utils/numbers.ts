/**
 * Converts a string to a number, removing any invalid symbols like `$` or `,`.
 * @param value A string number.
 * @returns The valid number value.
 */
export const normalizeNumber = (value: string) => {
  if (!value) return;

  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
};
