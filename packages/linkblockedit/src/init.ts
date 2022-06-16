import { ARIA_LABEL_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES, TABINDEX_KEY } from '@global/constants/a11ty';

import { ATTRIBUTE, getSelector } from './constants';

/**
 * Inits editor friendly link blocks.
 */
export const init = (): NodeListOf<HTMLElement> => {
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
  window.addEventListener('click', (e) => {
    const { target } = e;

    if (!(target instanceof HTMLElement) || target instanceof HTMLAnchorElement) return;

    const parentElement = target.closest(getSelector('element', 'parent'));
    if (!parentElement) return;

    e.preventDefault();

    const anchorElement = parentElement.querySelector<HTMLAnchorElement>('a');
    if (anchorElement) anchorElement.click();

    return false;
  });

  window.fsAttributes[ATTRIBUTE].resolve?.(elements);

  return elements;
};
