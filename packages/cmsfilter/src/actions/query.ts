import { normalizePropKey } from '@finsweet/attributes-cmscore';
import { extractCommaSeparatedValues, setFormFieldValue } from '@finsweet/ts-utils';

import type { CMSFilters } from '../components/CMSFilters';
import type { FiltersData } from '../utils/types';
import { handleFilterInput } from './input';

const { location, history } = window;

/**
 * Retrieves the existing query parameters of the `window.location` and applies the values to the filters.
 * @param cmsFilters The {@link CMSFilters} instance to update.
 */
export const getQueryParams = (cmsFilters: CMSFilters): boolean => {
  let queryParamsValid = false;

  const { filtersData } = cmsFilters;

  const url = new URL(location.href);
  const { searchParams } = url;

  for (const searchParam of searchParams) {
    const queryKey = normalizePropKey(searchParam[0]);
    const queryValue = searchParam[1];

    const filterData = filtersData.find(({ filterKeys }) => filterKeys.length === 1 && filterKeys.includes(queryKey));
    if (!filterData) continue;

    const queryValues = extractCommaSeparatedValues(queryValue, undefined, undefined, false);
    if (!queryValues.length) continue;

    queryParamsValid = true;

    const { elements, mode } = filterData;

    // Range Values
    if (mode === 'range') {
      const [fromValue, toValue] = queryValues;

      const fromElements = elements.filter(({ mode }) => mode === 'from');
      const toElements = elements.filter(({ mode }) => mode === 'to');

      if (fromValue && fromElements.length) {
        for (const elementData of fromElements) {
          const { element, type } = elementData;

          if (type === 'checkbox' || type === 'radio') setFormFieldValue(element, true);
          else setFormFieldValue(element, fromValue);

          handleFilterInput(element, filterData, elementData);
        }
      }

      if (toValue && toElements) {
        for (const elementData of toElements) {
          const { element, type } = elementData;

          if (type === 'checkbox' || type === 'radio') setFormFieldValue(element, true);
          else setFormFieldValue(element, toValue);

          handleFilterInput(element, filterData, elementData);
        }
      }

      continue;
    }

    // Regular Values
    for (const queryValue of queryValues) {
      for (const elementData of elements) {
        const { element, value, type } = elementData;

        if (value === queryValue && (type === 'checkbox' || type === 'radio')) setFormFieldValue(element, true);
        else if (!value && type !== 'checkbox' && type !== 'radio') setFormFieldValue(element, queryValue);
        else continue;

        handleFilterInput(element, filterData, elementData);
      }
    }
  }

  return queryParamsValid;
};

/**
 * Adds the filter values as query params in the current `window.location`.
 * @param filtersData
 */
export const setQueryParams = (filtersData: FiltersData) => {
  const url = new URL(location.href);
  const { searchParams } = url;

  for (const {
    filterKeys: [filterKey],
    values,
  } of filtersData) {
    if (!values.size) {
      searchParams.delete(filterKey);
      continue;
    }

    const value = [...values].join(',');

    searchParams.set(filterKey, value);
  }

  history.replaceState(null, '', url.toString());
};
