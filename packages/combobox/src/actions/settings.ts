import {
  ARIA_AUTOCOMPLETE_KEY,
  ARIA_CONTROLS_KEY,
  ARIA_CURRENT_KEY,
  ARIA_EXPANDED_KEY,
  ARIA_HIDDEN_KEY,
  ARIA_OWNS_KEY,
  AUTOCOMPLETE_KEY,
  DROPDOWN_CSS_CLASSES,
  type DropdownElement,
  type DropdownList,
  type DropdownToggle,
  findTextNode,
  isHTMLAnchorElement,
  NAME_KEY,
  REQUIRED_KEY,
  ROLE_KEY,
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
  const inputElement = dropdown.querySelector('input');
  const navListElement = queryElement('dropdown')?.querySelector('nav');
  const { body } = document;

  if (!selectElement || !inputElement || !navListElement) return;

  const dropdownToggle = dropdown.querySelector<DropdownToggle>(`.${DROPDOWN_CSS_CLASSES.dropdownToggle}`);
  const dropdownList = dropdown.querySelector<DropdownList>(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);

  if (!dropdownToggle || !dropdownList) return;
  dropdownToggle.setAttribute('disabled', 'disabled');

  setDropdownAria(dropdownToggle, dropdownList);

  const label = queryElement('label', { scope: dropdownToggle }) || findTextNode(dropdownToggle) || dropdownToggle;

  const optionTemplate = dropdownList.querySelector(`a:not(${getElementSelector('clear')})`);
  if (!isHTMLAnchorElement(optionTemplate)) return;

  const optionsList = optionTemplate.parentElement;
  if (!optionsList) return;

  const defaultOption = Array.from(selectElement.querySelectorAll('option')).find((opt) => opt.value === '');

  const noResultsTemplate = queryElement('empty', { scope: dropdown });
  const clearDropdown = queryElement('clear', { scope: dropdown }) as HTMLElement;

  for (const element of [optionTemplate]) {
    if (!element) continue;

    element.href = '#';
    element.setAttribute(TABINDEX_KEY, '-1');
    element.removeAttribute(ARIA_CURRENT_KEY);
    element.remove();
  }

  const hideInitial = hasAttributeValue(referenceElement, 'hideinitial', 'true');
  const preventClear = hasAttributeValue(referenceElement, 'preventClear', 'true');

  initializeAttributes(inputElement, selectElement, navListElement, clearDropdown, preventClear);

  return {
    optionsStore,
    selectElement,
    dropdownToggle,
    dropdownList,
    label,
    optionTemplate,
    noResultsTemplate,
    optionsList,
    hideInitial,
    preventClear,
    inputElement,
    clearDropdown,
    defaultOption,
    navListElement,
    body,
  };
};

/**
 * Initializes the attributes for the dropdown.
 * @param inputElement The input element.
 * @param selectElement The select element.
 * @param navListElement The nav list element.
 * @param clearDropdown The clear dropdown element.
 */
const initializeAttributes = (
  inputElement: HTMLInputElement,
  selectElement: HTMLSelectElement,
  navListElement: HTMLElement,
  clearDropdown: HTMLElement,
  preventClear: boolean
) => {
  inputElement?.parentElement?.setAttribute(TABINDEX_KEY, '-1');
  if (!preventClear) inputElement?.removeAttribute(NAME_KEY);
  inputElement?.setAttribute(TABINDEX_KEY, '0');
  inputElement?.removeAttribute('data-name');
  if (selectElement.hasAttribute(REQUIRED_KEY)) {
    inputElement?.setAttribute(REQUIRED_KEY, 'required');
  }
  inputElement?.setAttribute(ROLE_KEY, 'combobox');

  inputElement?.setAttribute(AUTOCOMPLETE_KEY, 'off');
  const navListElementId = navListElement.getAttribute('id') || '';
  inputElement?.setAttribute(ARIA_CONTROLS_KEY, navListElementId);
  inputElement?.setAttribute(ARIA_OWNS_KEY, navListElementId);
  inputElement?.setAttribute(ARIA_AUTOCOMPLETE_KEY, 'list');
  inputElement?.setAttribute(ARIA_EXPANDED_KEY, 'false');

  selectElement.setAttribute(ARIA_HIDDEN_KEY, 'true');
  selectElement.setAttribute(TABINDEX_KEY, '-1');

  navListElement.setAttribute(TABINDEX_KEY, '-1');

  clearDropdown?.setAttribute(TABINDEX_KEY, '0');
  clearDropdown?.setAttribute(ROLE_KEY, 'button');
  clearDropdown.style.display = 'none';
};
