import {
  addListener,
  ARIA_LABEL_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  type FinsweetAttributeInit,
  isHTMLAnchorElement,
  isHTMLElement,
  TABINDEX_KEY,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { getElementSelector, queryAllElements } from './utils/selectors';

/**
 * Inits editor friendly link blocks.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const elements = queryAllElements('parent');

  // Make the elements accessible
  for (const element of elements) {
    const anchorElement = element.querySelector('a');

    if (anchorElement && anchorElement.href) {
      element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.link);
      element.setAttribute(TABINDEX_KEY, '0');

      anchorElement.setAttribute(TABINDEX_KEY, '-1');

      if (anchorElement.textContent) element.setAttribute(ARIA_LABEL_KEY, anchorElement.textContent);
    }
  }

  // Listen events
  const clickCleanup = addListener(window, 'click', (e) => {
    const { target } = e;

    if (!isHTMLElement(target) || isHTMLAnchorElement(target)) return;

    const parentElement = target.closest(getElementSelector('parent'));
    if (!parentElement) return;

    e.preventDefault();

    const anchorElement = parentElement.querySelector('a');
    if (anchorElement) anchorElement.click();

    return false;
  });

  return {
    result: elements,
    destroy() {
      clickCleanup();
    },
  };
};
