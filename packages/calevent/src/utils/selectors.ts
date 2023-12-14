import { CAL_EVENT_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from '.';

export const { queryElement, queryAllElements, getElementSelector, getAttribute, getInstanceIndex } = generateSelectors(
  CAL_EVENT_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
