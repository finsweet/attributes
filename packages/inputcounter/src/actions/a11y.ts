import {
  ARIA_CONTROLS_KEY,
  ARIA_LABEL_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  TABINDEX_KEY,
} from '$global/constants/a11y';

/**
 * Sets A11Y attributes to a button.
 * @param inputElement
 * @param button
 * @param label
 */
export const setButtonA11Y = (inputElement: HTMLInputElement, button: Element, label: string) => {
  button.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.button);
  button.setAttribute(ARIA_CONTROLS_KEY, inputElement.id);
  button.setAttribute(TABINDEX_KEY, '0');

  if (!button.hasAttribute(ARIA_LABEL_KEY)) {
    button.setAttribute(ARIA_LABEL_KEY, label);
  }
};
