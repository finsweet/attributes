import { generateSelectors, MASONRY_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstanceIndex, queryAllElements, queryElement } = generateSelectors(
  MASONRY_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
