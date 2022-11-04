import { addListener, isHTMLAnchorElement, isHTMLElement } from '@finsweet/ts-utils';

import { ARIA_LABEL_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES, TABINDEX_KEY } from '$global/constants/a11y';
import { CMS_ATTRIBUTE_ATTRIBUTE, LINK_BLOCK_EDIT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { getSelector } from './constants';

/**
 * Inits editor friendly link blocks.
 */
export const init = async (): Promise<NodeListOf<HTMLElement>> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const elements = document.querySelectorAll<HTMLElement>(getSelector('element', 'parent'));

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

    const parentElement = target.closest(getSelector('element', 'parent'));
    if (!parentElement) return;

    e.preventDefault();

    const anchorElement = parentElement.querySelector<HTMLAnchorElement>('a');
    if (anchorElement) anchorElement.click();

    return false;
  });

  return finalizeAttribute(LINK_BLOCK_EDIT_ATTRIBUTE, elements, () => clickCleanup());
};
