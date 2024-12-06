import { generateSelectors, SOCIAL_SHARE_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, getAttribute, getSettingSelector, getElementSelector, queryAllElements, getInstance } =
  generateSelectors(SOCIAL_SHARE_ATTRIBUTE, ELEMENTS, SETTINGS);
