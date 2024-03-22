import { generateSelectors, READ_TIME_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getInstance, queryElement, queryAllElements, getAttribute } = generateSelectors(
  READ_TIME_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
