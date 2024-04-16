import { generateSelectors, TOOLTIP_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstance, queryElement, getElementSelector, queryAllElements } = generateSelectors(
  TOOLTIP_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
