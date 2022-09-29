import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, getSelector } from '../utils/constants';

/**
 * Queries the correspondent fixed element of a specific trigger.
 * @param trigger The trigger element.
 */
export const getLightboxElement = (trigger: Element) => {
  const instanceIndex = getInstanceIndex(trigger, ATTRIBUTES.element.key);

  const lightboxSelector = getSelector('element', 'lightbox', { instanceIndex });
  const lightboxElement =
    trigger.parentElement?.querySelector(lightboxSelector) || document.querySelector(lightboxSelector);

  return lightboxElement;
};
