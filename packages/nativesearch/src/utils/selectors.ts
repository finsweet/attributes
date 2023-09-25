import { generateSelectors, NATIVE_SEARCH_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, queryAllElements, getElementSelector, getAttribute } = generateSelectors(
  NATIVE_SEARCH_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
