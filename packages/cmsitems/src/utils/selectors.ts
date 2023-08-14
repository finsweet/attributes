import { generateSelectors, CMS_ITEMS_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { getAttribute } = generateSelectors(CMS_ITEMS_ATTRIBUTE, ELEMENTS, SETTINGS);
