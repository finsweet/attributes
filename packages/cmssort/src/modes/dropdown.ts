import type { CMSList } from '@finsweet/attributes-cmscore';
import { normalizePropKey } from '@finsweet/attributes-cmscore';
import { CURRENT_CSS_CLASS, Debug, DROPDOWN_CSS_CLASSES } from '@finsweet/ts-utils';
import type { Dropdown, DropdownToggle, DropdownList } from '@finsweet/ts-utils';
import {
  ARIA_HASPOPUP_KEY,
  ARIA_MULTISELECTABLE_KEY,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_SELECTED_KEY,
} from '@global/constants/a11ty';
import { closeDropdown } from '@global/helpers';

import { sortListItems } from '../actions/sort';
import { ATTRIBUTES, queryElement } from '../utils/constants';
import type {
  DropdownLabelData,
  DropdownOption,
  DropdownOptions,
  SortingDirection,
  SortItemsCallback,
} from '../utils/types';

const { dropdownToggle: dropdownToggleCSSClass, dropdownList: dropdownListCSSClass } = DROPDOWN_CSS_CLASSES;

/**
 * Inits sorting on a `Dropdown` component.
 * @param dropdown The {@link Dropdown} element.
 * @param listInstance The {@link CMSList} instance.
 */
export const initDropdown = (dropdown: Dropdown, listInstance: CMSList) => {
  const dropdownToggle = dropdown.querySelector<DropdownToggle>(`.${dropdownToggleCSSClass}`);
  const dropdownList = dropdown.querySelector<DropdownList>(`.${dropdownListCSSClass}`);

  if (!dropdownToggle || !dropdownList) {
    Debug.alert('The cmssort Dropdown is missing a toggle or a list.', 'error');
    return;
  }

  setDropdownAria(dropdownToggle, dropdownList);

  const dropdownLabel = collectDropdownLabelData(dropdownToggle);
  const dropdownOptions = collectDropdownOptions(dropdownList);

  if (!dropdownOptions) {
    Debug.alert("The cmssort Dropdown doesn't have any option.", 'error');
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
  dropdownList.addEventListener('click', async (e) => {
    e.preventDefault();

    if (sorting) return;

    sorting = true;

    const { target } = e;

    if (!(target instanceof Element)) {
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

  return sortItems;
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

    const fieldKey = element.getAttribute(ATTRIBUTES.field.key);

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
  const dropdownLabel = queryElement('dropdownLabel', { operator: 'prefixed', scope: dropdownToggle });
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
 * Adds `a11ty` attributes to the Dropdown elements.
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
