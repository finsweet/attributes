import { generateSelectors, SAFE_POLYGON_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryAllElements, queryElement, getInstance, getAttribute, hasAttributeValue } = generateSelectors(
  SAFE_POLYGON_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
