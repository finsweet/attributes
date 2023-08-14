import { CMS_ITEMS_ATTRIBUTE, generateSelectors } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute } = generateSelectors(CMS_ITEMS_ATTRIBUTE, ELEMENTS, SETTINGS);
