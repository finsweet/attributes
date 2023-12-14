/**
 * Extracts the string content between square brackets.
 * @param {string} text - The string containing the text to be extracted.
 * @returns {string} The extracted string or an empty string if not found.
 */
export const extractStringBetweenBrackets = (text: string) => {
  const match = text.match(/\[(.*?)\]/);
  return match ? match[1] : '';
};
