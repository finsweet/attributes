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

  const date = new Date(value);
  if (isNaN(date.getTime())) return;

  return new Date(dateFormatter.format(date));
};
