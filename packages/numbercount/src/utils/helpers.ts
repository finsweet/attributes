/**
 * Tries to extract a number value from an element's text.
 * If not valid, returns null.
 *
 * @param numberElement
 *
 * @returns Either a valid number or null.
 */
export const extractNumberFromElement = (numberElement: Element) => {
  const { textContent } = numberElement;
  if (!textContent) return null;

  const number = Number(textContent);

  return isNaN(number) ? null : number;
};
