import { generateSelectors, NATIVE_SEARCH_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const { queryElement, getElementSelector } = generateSelectors(NATIVE_SEARCH_ATTRIBUTE, ELEMENTS, SETTINGS);
