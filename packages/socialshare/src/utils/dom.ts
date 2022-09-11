import { CMS_CSS_CLASSES } from '@finsweet/ts-utils';
import type { CollectionItemElement } from '@finsweet/ts-utils';

/**
 * @returns A parent CMS Item element, if existing.
 * @param element
 */
export const getCMSItemWrapper = (element: HTMLElement) =>
  element.closest<CollectionItemElement>(`.${CMS_CSS_CLASSES.item}`) || undefined;
