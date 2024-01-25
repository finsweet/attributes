import { CONSENT_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getInstanceIndex,
  getAttribute,
  hasAttributeValue,
  getSettingSelector,
} = generateSelectors(CONSENT_ATTRIBUTE, ELEMENTS, SETTINGS);
