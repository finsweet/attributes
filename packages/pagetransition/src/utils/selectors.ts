import { generateSelectors, PAGE_TRANSITION_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement, getElementSelector } = generateSelectors(
  PAGE_TRANSITION_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
