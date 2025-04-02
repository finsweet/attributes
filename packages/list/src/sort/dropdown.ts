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
import { effect, type Ref, ref } from '@vue/reactivity';

import type { List } from '../components/List';
import { getAttribute, queryElement } from '../utils/selectors';
import type { SortingDirection } from './types';

type DropdownOption = {
  element: HTMLAnchorElement;
  field?: string;
  direction?: SortingDirection;
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

  const activeOption = ref<DropdownOption | undefined>();

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

    const isSelected = activeOption.value?.element === optionElement;
    if (isSelected) return;

    activeOption.value = optionData;

    list.sorting.value = {
      field: optionData.field,
      direction: optionData.direction,
      interacted: true,
    };

    closeDropdown(dropdownToggle);
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
const initDropdownOptions = (dropdownList: DropdownList, activeOption: Ref<DropdownOption | undefined>) => {
  const dropdownOptions: DropdownOptions = new Map();

  const options = [...dropdownList.querySelectorAll('a')];
  if (!options.length) return;

  for (const element of options) {
    element.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.option);

    const rawField = getAttribute(element, 'field');

    let field: string | undefined;
    let direction: SortingDirection | undefined;

    if (rawField) {
      if (rawField.endsWith('-asc')) {
        direction = 'asc';
        field = rawField.slice(0, -4);
      } else if (rawField.endsWith('-desc')) {
        direction = 'desc';
        field = rawField.slice(0, -5);
      } else {
        direction = 'asc';
        field = rawField;
      }
    }

    if (field) {
      field = normalizePropKey(field);
    }

    // Handle active state
    const runner = effect(() => {
      const isSelected = activeOption.value?.element === element;

      if (isSelected) {
        element.setAttribute(ARIA_SELECTED_KEY, 'true');
        element.classList.add(CURRENT_CSS_CLASS);
      } else {
        element.removeAttribute(ARIA_SELECTED_KEY);
        element.classList.remove(CURRENT_CSS_CLASS);
      }
    });

    dropdownOptions.set(element, {
      element,
      field,
      direction,
      cleanup: () => runner.effect.stop(),
    });
  }

  return dropdownOptions;
};

/**
 * Dynamically updates the Dropdown label with the selected option.
 * @param dropdownToggle The {@link DropdownToggle}.
 * @returns A cleanup function.
 */
const initDropdownLabel = (dropdownToggle: DropdownToggle, activeOption: Ref<DropdownOption | undefined>) => {
  const dropdownLabel = queryElement('dropdown-label', { scope: dropdownToggle });
  if (!dropdownLabel) return;

  const originalHTML = dropdownLabel.innerHTML;

  const runner = effect(() => {
    if (!activeOption.value) {
      dropdownLabel.innerHTML = originalHTML;
      return;
    }

    dropdownLabel.innerHTML = activeOption.value.element.innerHTML;
  });

  return () => runner.effect.stop();
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
