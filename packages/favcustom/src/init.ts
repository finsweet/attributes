import { FAV_CUSTOM_ATTRIBUTE } from '@global/constants/attributes';

import { queryElement } from './constants';

/**
 * Inits setting a custom favicon to the current page.
 */
export const init = (): string | undefined => {
  // Get the element's src, if existing.
  const srcElement = queryElement('src');
  const elementSrc = srcElement instanceof HTMLImageElement ? srcElement.src : undefined;
  const linkHref = elementSrc;

  if (!linkHref) return;

  //Build the link element
  const linkElement = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
  linkElement.type = 'image/x-icon';
  linkElement.rel = 'shortcut icon';
  linkElement.href = linkHref;

  // Append the new one
  document.head.appendChild(linkElement);

  window.fsAttributes[FAV_CUSTOM_ATTRIBUTE].resolve?.(linkHref);

  return linkHref;
};
