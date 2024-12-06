import { BEFORE_AFTER_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, getInstance, queryAllElements, getAttribute } = generateSelectors(
  BEFORE_AFTER_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
