import { getElementSelector, getInstance } from '../utils/selectors';

/**
 * Queries the correspondent fixed element of a specific trigger.
 * @param trigger The trigger element.
 */
export const getLightboxElement = (trigger: Element) => {
  const instance = getInstance(trigger);

  const lightboxSelector = getElementSelector('lightbox', { instance });
  const lightboxElement =
    trigger.parentElement?.querySelector(lightboxSelector) || document.querySelector(lightboxSelector);

  return lightboxElement;
};
