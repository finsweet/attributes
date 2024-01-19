/**
 * Format the description string.
 * @param description The description string.
 * @returns The formatted description string.
 */
export const formatDescription = (description: string) => {
  return description
    .replace(/,/gm, ',')
    .replace(/;/gm, ';')
    .replace(/\r\n/gm, '\n')
    .replace(/\n/gm, '\\n')
    .replace(/(\\n)[\s\t]+/gm, '\\n');
};

/**
 * Format the location string.
 * @param location The location string.
 * @returns The formatted location string.
 */
export const formatLocation = (location: string) => {
  return location
    .replace(/,/gm, ',')
    .replace(/;/gm, ';')
    .replace(/\r\n/gm, '\n')
    .replace(/\n/gm, '\\n')
    .replace(/(\\n)[\s\t]+/gm, '\\n');
};
