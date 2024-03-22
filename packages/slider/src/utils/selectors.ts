import { generateSelectors, SLIDER_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstance, queryAllElements, queryElement } = generateSelectors(
  SLIDER_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
