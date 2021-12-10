import { ARIA_HASPOPUP_KEY, ARIA_MULTISELECTABLE_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES } from '$utils/a11ty';

import type { DropdownToggle, DropdownList } from '@finsweet/ts-utils';
import type { OptionData } from '../utils/types';

const { listbox: listboxRole, option: optionRole } = ARIA_ROLE_VALUES;

/**
 * Adds `a11ty` attributes to the Dropdown elements.
 * @param dropdownToggle The {@link DropdownToggle} element.
 * @param dropdownList The {@link DropdownList} element.
 */
export const setDropdownAria = (dropdownToggle: DropdownToggle, dropdownList: DropdownList) => {
  dropdownToggle.setAttribute(ARIA_HASPOPUP_KEY, listboxRole);
  dropdownList.setAttribute(ARIA_ROLE_KEY, listboxRole);
  dropdownList.setAttribute(ARIA_MULTISELECTABLE_KEY, 'false');
};

/**
 * Sets the required aria attributes to a custom option element.
 * @param element
 */
export const setOptionAria = (element: OptionData['element']) => {
  element.setAttribute(ARIA_ROLE_KEY, optionRole);
};
