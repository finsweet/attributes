import { COMPONENT_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getInstance, queryAllElements, queryElement } = generateSelectors(
  COMPONENT_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
