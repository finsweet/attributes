import type { FormField } from '@finsweet/ts-utils';

import type { FilterData, FilterElement } from '../utils/types';

/**
 * Updates the `filtersData` object with the new input data.
 * Adds/Removes the active CSS Class.
 *
 * @param element The input element.
 * @param filtersData The {@link FiltersData} object.
 *
 * @returns `true` if the input event was valid and some filter data was updated.
 */
export const handleFilterInput = (element: FormField, filterData: FilterData, elementData: FilterElement): boolean => {
  const { value } = element;
  const { elements, values: filterValues, mode: filterMode } = filterData;
  const { value: storedValue, mode: elementMode, type, activeCSSClass } = elementData;

  switch (type) {
    case 'checkbox': {
      const { checked } = element as HTMLInputElement;

      if (!storedValue) break;

      // Active CSS
      element.parentElement?.classList[checked ? 'add' : 'remove'](activeCSSClass);

      filterValues[checked ? 'add' : 'delete'](storedValue);

      break;
    }

    case 'radio': {
      const { checked } = element as HTMLInputElement;

      // Active CSS
      for (const { element: groupElement, type } of elements) {
        if (type !== 'radio') return false;

        const addClass = (groupElement as HTMLInputElement).checked;

        groupElement.parentElement?.classList[addClass ? 'add' : 'remove'](activeCSSClass);
      }

      if (!checked || !storedValue) break;

      filterValues.clear();
      filterValues.add(storedValue);

      break;
    }

    default: {
      elementData.value = value;

      // Active CSS
      element.classList[value ? 'add' : 'remove'](activeCSSClass);

      // Range mode
      if (filterMode === 'range') {
        const newValues = [...filterValues];
        newValues[elementMode === 'from' ? 0 : 1] = value;

        if (newValues.some((value) => !!value)) filterData.values = new Set(newValues);
        else filterValues.clear();

        break;
      }

      // Regular mode
      filterValues.clear();

      if (value) filterValues.add(value);

      break;
    }
  }

  return true;
};
