import { type CollectionItemElement, getCMSElementSelector } from '@finsweet/attributes-utils';

/**
 * Get the CMS item wrapper element.
 * @param element The element to get the wrapper for.
 * @returns The CMS item wrapper element.
 */
export const getCMSItemWrapper = (element: HTMLElement) =>
  element.closest<CollectionItemElement>(getCMSElementSelector('item')) || undefined;
