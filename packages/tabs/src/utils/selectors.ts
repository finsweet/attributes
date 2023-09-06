import { generateSelectors, TABS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement } = generateSelectors(
  TABS_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
