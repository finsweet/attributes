import { clearFormField } from '@finsweet/ts-utils';

import type { FilterData, FilterElement } from '../utils/types';

/**
 * Clears a record of `FilterData`, including the input values.
 * Emits `input` events on all cleared `FormField` elements.
 *
 * @param filterData The {@link FilterData} object.
 * @param value If passed, only that specific value and the elements that hold it will be cleared.
 */
export const clearFilterData = ({ elements, values }: FilterData, value?: string) => {
  let elementsToClear: FilterElement[];

  if (value) {
    values.delete(value);
    elementsToClear = elements.filter((elementData) => elementData.value === value);
  } else {
    values.clear();
    elementsToClear = elements;
  }

  for (const { element } of elementsToClear) clearFormField(element);
};
