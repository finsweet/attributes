import { COPY_PASTE_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryAllElements, getInstanceIndex, queryElement, hasAttributeValue, getAttribute } = generateSelectors(
  COPY_PASTE_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
