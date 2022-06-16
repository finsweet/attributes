/**
 * Constants
 */
const dateFormatter = Intl.DateTimeFormat();

/**
 * Converts a string to a `Date` and returns a formatted version.
 * @param value
 * @returns
 */
export const normalizeDate = (value: string) => {
  if (!value) return;

  return new Date(dateFormatter.format(new Date(value)));
};
