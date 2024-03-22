import { DISPLAY_VALUES_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryAllElements, getInstance, getElementSelector, getAttribute } = generateSelectors(
  DISPLAY_VALUES_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
