import { isHTMLImageElement } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, FAV_CUSTOM_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { queryElement } from './constants';

/**
 * Inits setting a custom favicon to the current page.
 */
export const init = async (): Promise<string | undefined> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

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

  return finalizeAttribute(FAV_CUSTOM_ATTRIBUTE, linkHref);
};
