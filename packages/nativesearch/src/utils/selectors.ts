import { generateSelectors, NATIVE_SEARCH_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

/**
 * The selectors that are available for the Search Attribute.
 */
export const { queryElement, queryAllElements, getElementSelector, getAttribute } = generateSelectors(
  NATIVE_SEARCH_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
