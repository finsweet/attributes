import { generateSelectors, MODAL_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute, getSettingSelector, getInstance, queryAllElements } = generateSelectors(
  MODAL_ATTRIBUTE,
  ELEMENTS,
  SETTINGS
);
