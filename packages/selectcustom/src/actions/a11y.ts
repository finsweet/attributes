import type { DropdownToggle, DropdownList } from '@finsweet/ts-utils';

import { ARIA_HASPOPUP_KEY, ARIA_MULTISELECTABLE_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES } from '$global/constants/a11y';

import type { OptionData } from '../utils/types';

/**
 * Adds `a11ty` attributes to the Dropdown elements.
 * @param dropdownToggle The {@link DropdownToggle} element.
 * @param dropdownList The {@link DropdownList} element.
 */
export const setDropdownAria = (dropdownToggle: DropdownToggle, dropdownList: DropdownList) => {
  dropdownToggle.setAttribute(ARIA_HASPOPUP_KEY, ARIA_ROLE_VALUES.listbox);
  dropdownList.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.listbox);
  dropdownList.setAttribute(ARIA_MULTISELECTABLE_KEY, 'false');
};

/**
 * Sets the required aria attributes to a custom option element.
 * @param element
 */
export const setOptionAria = (element: OptionData['element']) => {
  element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.option);
};
