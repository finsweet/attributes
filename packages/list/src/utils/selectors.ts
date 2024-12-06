import { generateSelectors, LIST_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getSettingSelector,
  getClosestElement,
  getAttribute,
  hasAttributeValue,
  getInstance,
} = generateSelectors(LIST_ATTRIBUTE, ELEMENTS, SETTINGS);
