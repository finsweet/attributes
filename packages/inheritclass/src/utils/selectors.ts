import { generateSelectors, INHERIT_CLASS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement, getSettingSelector } = generateSelectors(
  INHERIT_CLASS_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
