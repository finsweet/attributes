import { generateSelectors, HIDE_EMPTY_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryAllElements } = generateSelectors(HIDE_EMPTY_ATTRIBUTE, ELEMENTS, SETTINGS);
