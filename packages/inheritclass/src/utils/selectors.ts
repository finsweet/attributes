import { generateSelectors, INHERIT_CLASS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, getSettingSelector } = generateSelectors(
  INHERIT_CLASS_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
