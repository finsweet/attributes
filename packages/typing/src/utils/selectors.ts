import { generateSelectors, TYPING_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement, getElementSelector } = generateSelectors(
  TYPING_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
