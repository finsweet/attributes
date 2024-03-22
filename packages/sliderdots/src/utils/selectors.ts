import { generateSelectors, SLIDER_DOTS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getInstance, queryElement, getAttribute, hasAttributeValue, getElementSelector } = generateSelectors(
  SLIDER_DOTS_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
