import { BEFORE_AFTER_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, getInstanceIndex, queryAllElements, getAttribute } = generateSelectors(
  BEFORE_AFTER_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
