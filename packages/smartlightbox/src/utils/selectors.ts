import { generateSelectors, SMART_LIGHTBOX_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getInstance, getElementSelector, getAttribute } = generateSelectors(
  SMART_LIGHTBOX_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
