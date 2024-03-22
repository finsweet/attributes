import { generateSelectors, MIRROR_INPUT_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getElementSelector, getInstance, queryElement } = generateSelectors(
  MIRROR_INPUT_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
