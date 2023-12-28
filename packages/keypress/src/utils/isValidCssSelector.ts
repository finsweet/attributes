/**
 * Checks if the provided string is a valid CSS selector.
 * @param {string} selector - The CSS selector string to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const isValidCssSelector = (selector: string) => {
  try {
    document.querySelector(selector);
    return true;
  } catch (e) {
    return false;
  }
};
