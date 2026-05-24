import { generateSelectors, SAFE_TRIANGLES_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryAllElements, queryElement, getInstance, getAttribute, hasAttributeValue } = generateSelectors(
  SAFE_TRIANGLES_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
