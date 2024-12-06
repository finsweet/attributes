import { COUNT_ITEMS_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, queryAllElements, getInstance } = generateSelectors(
  COUNT_ITEMS_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
