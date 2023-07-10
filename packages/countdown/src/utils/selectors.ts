import { COUNTDOWN_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, queryElement, queryAllElements, getInstanceIndex } = generateSelectors(
  COUNTDOWN_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
