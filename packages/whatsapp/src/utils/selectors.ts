import { generateSelectors, WHATSAPP_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, hasAttributeValue, queryAllElements, getInstanceIndex, queryElement } = generateSelectors(
  WHATSAPP_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
