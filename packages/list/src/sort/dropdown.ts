import {
  addListener,
  ARIA_HASPOPUP_KEY,
  ARIA_MULTISELECTABLE_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_SELECTED_KEY,
  closeDropdown,
  CURRENT_CSS_CLASS,
  DROPDOWN_CSS_CLASSES,
  type DropdownElement,
  type DropdownList,
  type DropdownToggle,
  isElement,
  normalizePropKey,
} from '@finsweet/attributes-utils';
import { atom, type WritableAtom } from 'nanostores';

import type { List } from '../components/List';
import { getAttribute, queryElement } from '../utils/selectors';
import { sortListItems } from './sort';
import type { SortingDirection } from './types';

type DropdownOption = {
  element: HTMLAnchorElement;
  sortKey?: string;
  sortDirection?: SortingDirection;
  cleanup: () => void;
};

type DropdownOptions = Map<HTMLAnchorElement, DropdownOption>;

/**
 * Inits sorting on a `Dropdown` component.
 * @param dropdown The {@link DropdownElement} element.
 * @param list The {@link List} instance.
 */
export const initDropdown = (dropdown: DropdownElement, list: List) => {
  const dropdownToggle = dropdown.querySelector<DropdownToggle>(`.${DROPDOWN_CSS_CLASSES.dropdownToggle}`);
  const dropdownList = dropdown.querySelector<DropdownList>(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);

  if (!dropdownToggle || !dropdownList) {
    return;
  }

  setDropdownAria(dropdownToggle, dropdownList);

  const activeOption = atom<DropdownOption | undefined>();

  let sortKey: string | undefined;
  let sortDirection: SortingDirection | undefined;

  list.addHook('sort', (items) => sortListItems(items, sortKey, sortDirection));

  // Listen events
  const dropdownLabelCleanup = initDropdownLabel(dropdownToggle, activeOption);

  const dropdownOptions = initDropdownOptions(dropdownList, activeOption);
  if (!dropdownOptions) {
    return;
  }

  const clickCleanup = addListener(dropdownList, 'click', async (e) => {
    e.preventDefault();

    const { target } = e;

    if (!isElement(target)) {
      return;
    }

    const optionElement = target.closest('a');
    if (!optionElement) return;

    const optionData = dropdownOptions.get(optionElement);
    if (!optionData) return;

    const isSelected = activeOption.get()?.element === optionElement;
    if (isSelected) return;

    activeOption.set(optionData);

    ({ sortKey, sortDirection } = optionData);

    closeDropdown(dropdownToggle);

    await list.triggerHook('sort');
  });

  return () => {
    dropdownLabelCleanup?.();
    clickCleanup();
  };
};

/**
 * Collects all options in the Dropdown.
 * @param dropdownList The {@link DropdownList} element.
 * @returns
 */
const initDropdownOptions = (dropdownList: DropdownList, activeOption: WritableAtom<DropdownOption | undefined>) => {
  const dropdownOptions: DropdownOptions = new Map();

  const options = [...dropdownList.querySelectorAll('a')];
  if (!options.length) return;

  for (const element of options) {
    element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.option);

    const fieldKey = getAttribute(element, 'field');

    let sortKey: string | undefined;
    let sortDirection: SortingDirection | undefined;

    if (fieldKey) {
      if (fieldKey.endsWith('-asc')) {
        sortDirection = 'asc';
        sortKey = fieldKey.slice(0, -4);
      } else if (fieldKey.endsWith('-desc')) {
        sortDirection = 'desc';
        sortKey = fieldKey.slice(0, -5);
      } else {
        sortDirection = 'asc';
        sortKey = fieldKey;
      }
    }

    if (sortKey) {
      sortKey = normalizePropKey(sortKey);
    }

    // Handle active state
    const cleanup = activeOption.subscribe((option) => {
      const isSelected = option?.element === element;

      if (isSelected) {
        element.setAttribute(ARIA_SELECTED_KEY, 'true');
        element.classList.add(CURRENT_CSS_CLASS);
      } else {
        element.removeAttribute(ARIA_SELECTED_KEY);
        element.classList.remove(CURRENT_CSS_CLASS);
      }
    });

    dropdownOptions.set(element, { element, sortKey, sortDirection, cleanup });
  }

  return dropdownOptions;
};

/**
 * Dynamically updates the Dropdown label with the selected option.
 * @param dropdownToggle The {@link DropdownToggle}.
 * @returns A cleanup function.
 */
const initDropdownLabel = (dropdownToggle: DropdownToggle, activeOption: WritableAtom<DropdownOption | undefined>) => {
  const dropdownLabel = queryElement('dropdown-label', { scope: dropdownToggle });
  if (!dropdownLabel) return;

  const originalHTML = dropdownLabel.innerHTML;

  const cleanup = activeOption.subscribe((option) => {
    if (!option) {
      dropdownLabel.innerHTML = originalHTML;
      return;
    }

    dropdownLabel.innerHTML = option.element.innerHTML;
  });

  return cleanup;
};

/**
 * Adds `a11y` attributes to the Dropdown elements.
 * @param dropdownToggle The {@link DropdownToggle} element.
 * @param dropdownList The {@link DropdownList} element.
 */
const setDropdownAria = (dropdownToggle: DropdownToggle, dropdownList: DropdownList) => {
  dropdownToggle.setAttribute(ARIA_HASPOPUP_KEY, ARIA_ROLE_VALUES.listbox);
  dropdownList.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.listbox);
  dropdownList.setAttribute(ARIA_MULTISELECTABLE_KEY, 'false');
};
