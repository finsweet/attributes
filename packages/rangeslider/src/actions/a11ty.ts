import {
  ARIA_LABELLEDBY_KEY,
  ARIA_LABEL_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  TABINDEX_KEY,
} from '$global/constants/a11ty';

/**
 * Sets the required `a11ty` attributes to a `Handle` element.
 * @param element The `Handle` element.
 * @param inputElement The correspondent `<input>` for the `Handle`, if existing.
 */
export const setHandleA11ty = (element: HTMLElement, inputElement?: HTMLInputElement) => {
  element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.slider);
  element.setAttribute(TABINDEX_KEY, '0');

  if (![ARIA_LABEL_KEY, ARIA_LABELLEDBY_KEY].some((key) => element.getAttribute(key)) && inputElement) {
    element.setAttribute(ARIA_LABEL_KEY, inputElement.name);
  }
};
