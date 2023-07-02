import type { CMSList } from '@finsweet/attributes-cmscore';
import {
  addListener,
  ARIA_HASPOPUP_KEY,
  ARIA_MULTISELECTABLE_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_SELECTED_KEY,
  closeDropdown,
  CURRENT_CSS_CLASS,
  type Dropdown,
  DROPDOWN_CSS_CLASSES,
  type DropdownList,
  type DropdownToggle,
  isElement,
  normalizePropKey,
} from '@finsweet/attributes-utils';

import { sortListItems } from '../actions/sort';
import { getAttribute, queryElement } from '../utils/selectors';
import type {
  DropdownLabelData,
  DropdownOption,
  DropdownOptions,
  SortingDirection,
  SortItemsCallback,
} from '../utils/types';

/**
 * Inits sorting on a `Dropdown` component.
 * @param dropdown The {@link Dropdown} element.
 * @param listInstance The {@link CMSList} instance.
 */
export const initDropdown = (dropdown: Dropdown, listInstance: CMSList) => {
  const dropdownToggle = dropdown.querySelector<DropdownToggle>(`.${DROPDOWN_CSS_CLASSES.dropdownToggle}`);
  const dropdownList = dropdown.querySelector<DropdownList>(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);

  if (!dropdownToggle || !dropdownList) {
    return;
  }

  setDropdownAria(dropdownToggle, dropdownList);

  const dropdownLabel = collectDropdownLabelData(dropdownToggle);
  const dropdownOptions = collectDropdownOptions(dropdownList);

  if (!dropdownOptions) {
    return;
  }

  let sorting = false;
  let sortKey: string | undefined;
  let direction: SortingDirection | undefined;

  /**
   * Sorts the items based on the current selected `sortKey` and `direction`.
   * @param addingItems Defines if new items are being added.
   * In that case, the rendering responsibilities are handled by another controller.
   */
  const sortItems: SortItemsCallback = async (addingItems?: boolean) => {
    await sortListItems(listInstance, { direction, sortKey, addingItems });
  };

  // Listen events
  const clickCleanup = addListener(dropdownList, 'click', async (e) => {
    e.preventDefault();

    if (sorting) return;

    sorting = true;

    const { target } = e;

    if (!isElement(target)) {
      sorting = false;
      return;
    }

    const optionElement = target.closest('a');
    if (!optionElement) {
      sorting = false;
      return;
    }

    const optionData = dropdownOptions.find(({ element }) => element === optionElement);
    if (!optionData || optionData.selected) {
      sorting = false;
      return;
    }

    const previousSelectedOption = dropdownOptions.find(({ selected }) => selected);
    if (previousSelectedOption) previousSelectedOption.selected = false;

    optionData.selected = true;

    ({ sortKey, direction } = optionData);

    updateOptionsState(dropdownOptions);

    dropdownLabel?.updateContent(optionData);

    closeDropdown(dropdownToggle);

    await sortItems();

    sorting = false;
  });

  return {
    sortItems,
    cleanup: () => {
      clickCleanup();
    },
  };
};

/**
 * Collects all options in the Dropdown.
 * @param dropdownList The {@link DropdownList} element.
 * @returns
 */
const collectDropdownOptions = (dropdownList: DropdownList) => {
  const dropdownOptions: DropdownOptions = [];

  const options = dropdownList.querySelectorAll('a');

  if (!options.length) return;

  for (const element of options) {
    element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.option);

    const fieldKey = getAttribute(element, 'field');

    let sortKey: string | undefined;
    let direction: SortingDirection | undefined;

    if (fieldKey) {
      if (fieldKey.endsWith('-asc')) {
        direction = 'asc';
        sortKey = fieldKey.slice(0, -4);
      } else if (fieldKey.endsWith('-desc')) {
        direction = 'desc';
        sortKey = fieldKey.slice(0, -5);
      } else {
        direction = 'asc';
        sortKey = fieldKey;
      }
    }

    if (sortKey) sortKey = normalizePropKey(sortKey);

    dropdownOptions.push({ element, sortKey, direction, selected: false });
  }

  return dropdownOptions;
};

/**
 * Collects the data of the dynamic label in the Dropdown Toggle.
 * @param dropdownToggle The {@link DropdownToggle}.
 * @returns A {@link DropdownLabelData} object, if existing.
 */
const collectDropdownLabelData = (dropdownToggle: DropdownToggle): DropdownLabelData | undefined => {
  const dropdownLabel = queryElement('dropdown-label', { scope: dropdownToggle });
  if (!dropdownLabel) return;

  const originalHTML = dropdownLabel.innerHTML;

  /**
   * Updates the dropdown label's content.
   * @param option The selected {@link DropdownOption}.
   */
  const updateContent = ({ element, sortKey }: DropdownOption) => {
    dropdownLabel.innerHTML = sortKey ? element.innerHTML : originalHTML;
  };

  return {
    element: dropdownLabel,
    originalHTML,
    updateContent,
  };
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

/**
 * Updates the state of each Dropdown Option.
 * @param dropdownOptions A {@link DropdownOptions} array.
 */
const updateOptionsState = (dropdownOptions: DropdownOptions) => {
  for (const { element, selected } of dropdownOptions) {
    if (selected) {
      element.setAttribute(ARIA_SELECTED_KEY, 'true');
      element.classList.add(CURRENT_CSS_CLASS);
      continue;
    }

    element.removeAttribute(ARIA_SELECTED_KEY);
    element.classList.remove(CURRENT_CSS_CLASS);
  }
};
