import { FAVORITE_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement } = generateSelectors(
  FAVORITE_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
