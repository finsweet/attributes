import { COUNTRY_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement } = generateSelectors(
  COUNTRY_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
