import {
  ARIA_CURRENT_KEY,
  DROPDOWN_CSS_CLASSES,
  type DropdownElement,
  type DropdownList,
  type DropdownToggle,
  findTextNode,
  isHTMLAnchorElement,
  TABINDEX_KEY,
} from '@finsweet/attributes-utils';

import { getElementSelector, hasAttributeValue, queryElement } from '../utils/selectors';
import type { OptionsStore } from '../utils/types';
import { setDropdownAria } from './a11y';

/**
 * Collects the required elements/settings for the setup.
 * @param dropdown The {@link Dropdown} element.
 */
export const collectSettings = (referenceElement: HTMLElement) => {
  const optionsStore: OptionsStore = [];

  const dropdown = referenceElement.closest<DropdownElement>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);
  if (!dropdown) return;

  const selectElement = dropdown.querySelector('select');
  if (!selectElement) return;

  const dropdownToggle = dropdown.querySelector<DropdownToggle>(`.${DROPDOWN_CSS_CLASSES.dropdownToggle}`);
  const dropdownList = dropdown.querySelector<DropdownList>(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);
  if (!dropdownToggle || !dropdownList) return;

  setDropdownAria(dropdownToggle, dropdownList);

  const label = queryElement('label', { scope: dropdownToggle }) || findTextNode(dropdownToggle) || dropdownToggle;

  const optionTemplate = dropdownList.querySelector(`a:not(${getElementSelector('clear')})`);

  if (!isHTMLAnchorElement(optionTemplate)) return;

  const optionsList = optionTemplate.parentElement;
  if (!optionsList) return;

  const emptyOption = queryElement<HTMLAnchorElement>('clear', { scope: dropdownList });

  for (const element of [optionTemplate, emptyOption]) {
    if (!element) continue;

    element.href = '#';
    element.setAttribute(TABINDEX_KEY, '-1');
    element.removeAttribute(ARIA_CURRENT_KEY);
    element.remove();
  }

  const hideInitial = hasAttributeValue(referenceElement, 'hideinitial', 'true');

  return {
    optionsStore,
    selectElement,
    dropdownToggle,
    dropdownList,
    label,
    optionTemplate,
    optionsList,
    emptyOption,
    hideInitial,
  };
};
