import { type FinsweetAttributeInit, isHTMLImageElement, waitWebflowReady } from '@finsweet/attributes-utils';

import { queryElement } from './utils/selectors';

/**
 * Inits setting a custom favicon to the current page.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  // Get the element's src, if existing.
  const srcElement = queryElement('src');
  const elementSrc = isHTMLImageElement(srcElement) ? srcElement.src : undefined;
  const linkHref = elementSrc;

  if (!linkHref) return;

  //Build the link element
  const linkElement = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
  linkElement.type = 'image/x-icon';
  linkElement.rel = 'shortcut icon';
  linkElement.href = linkHref;

  // Append the new one
  document.head.appendChild(linkElement);

  return {
    result: linkHref,
  };
};
