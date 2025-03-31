import {
  type FormFieldType,
  isDate,
  isString,
  isUndefined,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';
import * as fuzzysort from 'fuzzysort';

import type { ListItemField, ListItemFieldValue } from '../components';

/**
 * Parses the filter value based on the field type.
 * @param filterValue
 * @param fieldData
 * @returns The parsed filter value, if it could be parsed. Otherwise, `null`.
 */
export const parseFilterValue = (
  filterValue: string,
  filterType: FormFieldType,
  fieldType?: ListItemField['type']
): ListItemFieldValue | null => {
  if (
    fieldType === 'date' ||
    filterType === 'date' ||
    filterType === 'time' ||
    filterType === 'datetime-local' ||
    filterType === 'month' ||
    filterType === 'week'
  ) {
    const parsedFilterValue = normalizeDate(filterValue);

    if (parsedFilterValue === undefined || isNaN(parsedFilterValue.getTime())) {
      return null;
    }

    return parsedFilterValue;
  }

  if (fieldType === 'number' || filterType === 'number' || filterType === 'range') {
    const parsedFilterValue = normalizeNumber(filterValue);

    if (parsedFilterValue === undefined || isNaN(parsedFilterValue)) {
      return null;
    }

    return parsedFilterValue;
  }

  return filterValue;
};
/**
 * Checks if two values are equal.
 * @param fieldValue
 * @param filterValue
 * @param fuzzyThreshold
 */
export const areEqual = (fieldValue: ListItemFieldValue, filterValue: ListItemFieldValue, fuzzyThreshold?: number) => {
  // Ensure that dates are compared as dates
  if (typeof fieldValue !== typeof filterValue) {
    if (isDate(fieldValue)) {
      filterValue = normalizeDate(filterValue) || filterValue;
    } else if (isDate(filterValue)) {
      fieldValue = normalizeDate(fieldValue) || fieldValue;
    }
  }

  const normalizedFieldValue = isDate(fieldValue)
    ? fieldValue.getTime()
    : isString(fieldValue)
    ? fieldValue.toLowerCase()
    : fieldValue;
  const normalizedFilterValue = isDate(filterValue)
    ? filterValue.getTime()
    : isString(filterValue)
    ? filterValue.toLowerCase()
    : filterValue;

  if (fuzzyThreshold) {
    const normalizedFuzzyThreshold = fuzzyThreshold / 100;

    const score = fuzzysort.single(normalizedFilterValue.toString(), normalizedFieldValue.toString())?.score;
    return score && score >= normalizedFuzzyThreshold;
  }

  return normalizedFieldValue === normalizedFilterValue;
};
/**
 * Compares two numeric values.
 * @param rawA
 * @param rawB
 * @param op
 * @returns `true` if the comparison is successful.
 */
export const numericCompare = (
  rawA: ListItemFieldValue,
  rawB: ListItemFieldValue,
  op: 'greater' | 'greater-equal' | 'less' | 'less-equal'
) => {
  let a: number | undefined;
  let b: number | undefined;

  if (isDate(rawA) || isDate(rawB)) {
    a = normalizeDate(rawA)?.getTime();
    b = normalizeDate(rawB)?.getTime();
  } else if (isString(rawA) || isString(rawB)) {
    a = normalizeNumber(rawA);
    b = normalizeNumber(rawB);
  } else {
    a = rawA;
    b = rawB;
  }

  if (isUndefined(a) || isUndefined(b)) return false;

  if (op === 'greater') return a > b;
  if (op === 'greater-equal') return a >= b;
  if (op === 'less') return a < b;
  if (op === 'less-equal') return a <= b;

  return false;
};
