import type { FormField } from '@finsweet/ts-utils';

import { getCMSElementSelector } from '$global/helpers';

/**
 * Makes sure a `FormField` element has a unique ID, as when using them inside `Collection Lists`, Webflow tends to use the same ID for all children.
 *
 * @param element A {@link FormField} element.
 * @param index The index of the element.
 *
 * @returns Nothing, it mutates the element's ID.
 */
export const ensureUniqueFormFieldId = (element: FormField, index: number) => {
  const isDynamic = element.closest(getCMSElementSelector('item'));
  if (!isDynamic) return;

  element.id = `${element.id}-${index}`;
};
