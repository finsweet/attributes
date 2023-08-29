import { CMS_LOAD_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  getAttribute,
  hasAttributeValue,
  getInstanceIndex,
  getSettingAttributeName,
} = generateSelectors(CMS_LOAD_ATTRIBUTE, ELEMENTS, SETTINGS);
