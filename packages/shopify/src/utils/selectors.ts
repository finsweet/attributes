import { generateSelectors, SHOPIFY_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getInstanceIndex,
  getAttribute,
  hasAttributeValue,
  getSettingSelector,
} = generateSelectors(SHOPIFY_ATTRIBUTE, ELEMENTS, SETTINGS);
