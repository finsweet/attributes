import { ACCORDION_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  getClosestElement,
  queryElement,
  queryAllElements,
  getAttribute,
  hasAttributeValue,
} = generateSelectors(ACCORDION_ATTRIBUTE, ELEMENTS, SETTINGS);
