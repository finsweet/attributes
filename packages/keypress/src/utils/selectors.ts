import { generateSelectors, KEYPRESS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  getInstanceIndex,
  queryAllElements,
  getAttribute,
  queryElement,
  getSettingSelector,
} = generateSelectors(KEYPRESS_ATTRIBUTE, ELEMENTS, SETTINGS);
