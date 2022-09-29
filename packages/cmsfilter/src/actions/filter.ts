import { normalizeDate, normalizeNumber } from '$global/helpers';
import type { CMSItem } from '$packages/cmscore';

import type { FiltersData } from '../utils/types';
import { restartHighlight } from './highlight';

/**
 * Assesses if an item should be displayed/hidden based on the filters.
 * @param item The {@link CMSItem} to assess.
 * @param filtersData The {@link FiltersData} object.
 * @param filtersAreEmpty Defines if the current filters are empty.
 * @returns `true` to show, `false` to hide the item.
 */
export const assessFilter = (
  item: CMSItem,
  filtersData: FiltersData,
  filtersAreEmpty: boolean,
  highlightActivated: boolean
): boolean => {
  if (highlightActivated) restartHighlight(item);

  if (filtersAreEmpty) return true;

  return filtersData.every((filterData) => checkFilterValidity(item, filterData));
};

/**
 * Checks if a CMSItem's props match the filter values.
 * @param item The {@link CMSItem} instance.
 * @param filter The data of a specific filter key.
 * @returns `true` when the `CMSItem` matches the conditions.
 */
const checkFilterValidity = (
  item: CMSItem,
  {
    filterKeys,
    values,
    match,
    mode: filterMode,
    highlight,
    highlightCSSClass,
    elements: filterElements,
  }: FiltersData[number]
) => {
  if (typeof item.staticIndex === 'number') {
    return true;
  }

  const filterValues = [...values];
  if (!filterValues.length) return true;

  const isGlobal = filterKeys.includes('*');

  if (isGlobal) filterKeys = Object.keys(item.props);

  const validFilterKeys = filterKeys.filter((filterKey) => {
    // Get prop data
    const prop = item.props[filterKey];
    if (!prop) return false;

    const { values, highlightData, type: propType, range: propRange } = prop;

    const propValues = [...values];
    if (!propValues.length) return false;

    // Range Filter Modes
    if (filterMode === 'range') {
      const [propValue] = propValues;
      const [filterFrom, filterTo] = filterValues;

      const isValid = checkRangeValidity(propValue, filterFrom, filterTo, propType);

      if (isValid && highlight) highlightData?.set(propValue, { highlightCSSClass });

      return isValid;
    }

    // Regular Filter Modes
    const matchingFilterValues = filterValues.filter((filterValue) => {
      // Range Prop Values
      if (propRange === 'from' || propRange === 'to') {
        const [propFrom, propTo] = propValues;

        const isValid = checkRangeValidity(filterValue, propFrom, propTo, propType);

        if (isValid && highlight) {
          highlightData?.set(propFrom, { highlightCSSClass });
          highlightData?.set(propTo, { highlightCSSClass });
        }

        return isValid;
      }

      // Regular Prop Values
      const hasValue = propValues.some((propValue) => {
        let isValid: boolean;

        // Date Prop
        if (propType === 'date' && !isGlobal) {
          const [filterDateTime, propDateTime] = [filterValue, propValue].map((value) =>
            normalizeDate(value)?.getTime()
          );

          isValid = filterDateTime === propDateTime;
        }

        // Single Prop Value
        else if (
          filterElements.some(({ type }) => !['checkbox', 'radio', 'select-one'].includes(type)) ||
          filterKeys.length > 1
        ) {
          isValid = propValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        // Multiple Prop Values
        else isValid = filterValue.toLowerCase() === propValue.toLowerCase();

        if (isValid && highlight) highlightData?.set(propValue, { highlightCSSClass, filterValue });

        return isValid;
      });

      return hasValue;
    });

    return match === 'all' ? matchingFilterValues.length === filterValues.length : matchingFilterValues.length > 0;
  });

  return match === 'all' ? validFilterKeys.length === filterKeys.length : validFilterKeys.length > 0;
};

/**
 * Checks if a value matches the specified `from` and `to` range.
 * @param value The value to assess.
 * @param from The range start.
 * @param to The range end.
 * @param type The type of the values.
 * @returns `true` if it's valid.
 */
const checkRangeValidity = (value: string, from: string, to: string, type?: string | null) => {
  const [normalizedValue, normalizedFrom, normalizedTo] = [value, from, to].map((string) =>
    type === 'date' ? normalizeDate(string) : normalizeNumber(string)
  );

  if (!normalizedValue) return false;

  if (!from && typeof normalizedTo !== 'undefined') return normalizedValue <= normalizedTo;

  if (!to && typeof normalizedFrom !== 'undefined') return normalizedValue >= normalizedFrom;

  if (typeof normalizedTo === 'undefined' || typeof normalizedFrom === 'undefined') return false;

  return normalizedValue >= normalizedFrom && normalizedValue <= normalizedTo;
};
