import { generateSelectors, LIST_ATTRIBUTE } from '@finsweet/attributes-utils';

import { ELEMENTS, SETTINGS } from './constants';

export const {
  getElementSelector,
  queryElement,
  queryAllElements,
  getSettingSelector,
  getSettingAttributeName,
  getClosestElement,
  getAttribute,
  hasAttributeValue,
  getInstance,
  getInstanceSelector,
} = generateSelectors(LIST_ATTRIBUTE, ELEMENTS, SETTINGS);

export const CUSTOM_VALUE_ATTRIBUTE = getSettingAttributeName('value');

/**
 * @returns The split separator for the element.
 * @param element
 */
export const getSplitSeparator = (element: Element) => {
  const rawSplitSeparator = getAttribute(element, 'split');

  const splitSeparator = rawSplitSeparator === 'true' ? ' ' : rawSplitSeparator;
  return splitSeparator;
};
