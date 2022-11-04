import type { CollectionItemElement } from '@finsweet/ts-utils';

import { getCMSElementSelector } from '$global/helpers';

/**
 * @returns A parent CMS Item element, if existing.
 * @param element
 */
export const getCMSItemWrapper = (element: HTMLElement) =>
  element.closest<CollectionItemElement>(getCMSElementSelector('item')) || undefined;
