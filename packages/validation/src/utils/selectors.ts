import { generateSelectors, VALIDATION_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement, getSettingSelector ,getSettingAttributeName } = generateSelectors(
  VALIDATION_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
