/**
 * Calculates the time zone offset
 * @param timeZone Timezone, example: GMT-02:00
 * @returns Number that represents the offset
 */
export const getTimezoneOffset = (timeZone: string | null) => {
  const offsetParts = timeZone?.match(/([+-])(\d{2}):(\d{2})/);
  if (offsetParts) {
    const sign = offsetParts[1] === '-' ? -1 : 1;
    const hours = parseInt(offsetParts[2]);
    const minutes = parseInt(offsetParts[3]);
    return sign * (hours * 60 + minutes) * 60 * 1000;
  }
  return 0;
};

/**
 * Adds content to innerHTML of an element
 * @param element HTML element for adding content
 * @param value Content to be added
 */
export const setInnerHTML = (element: HTMLElement | null, value: string): void => {
  if (element) {
    element.innerHTML = value;
  }
};
