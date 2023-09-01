import { CMS_FILTER_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getInstanceIndex,
  getAttribute,
  hasAttributeValue,
  getSettingSelector,
  getSettingAttributeName,
} = generateSelectors(CMS_FILTER_ATTRIBUTE, ELEMENTS, SETTINGS);
