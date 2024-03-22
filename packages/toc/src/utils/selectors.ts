import { generateSelectors, TOC_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getElementSelector, queryElement, getInstance, getAttribute, hasAttributeValue, queryAllElements } =
  generateSelectors(TOC_ATTRIBUTE, ELEMENTS, SETTINGS);
