import { generateSelectors, INPUT_COUNTER_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, getElementSelector, getInstance, getAttribute } = generateSelectors(
  INPUT_COUNTER_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
