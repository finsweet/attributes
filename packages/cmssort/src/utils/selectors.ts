import { CMS_SORT_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  getSettingAttributeName,
  queryElement,
  queryAllElements,
  getInstanceIndex,
  getAttribute,
  hasAttributeValue,
} = generateSelectors(CMS_SORT_ATTRIBUTE, ELEMENTS, SETTINGS);
