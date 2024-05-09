import { isNumber, isString, normalizeDate, normalizeNumber } from '@finsweet/attributes-utils';

import type { ListItem, ListItemField } from '../components/ListItem';
import type { Filters, FiltersCondition, FiltersGroup } from './types';

export const filterItems = (filters: Filters, items: ListItem[]) => {
  console.log({ filters, items });

  const filteredItems = items.filter((item) => {
    const groupsPredicate = ({ conditions, match }: FiltersGroup) => {
      const conditionsPredicate = (filterData: FiltersCondition) => {
        if (!filterData.field || !filterData.op || !filterData.value) return true;

        const fieldData = item.fields[filterData.field];
        if (!fieldData) return false;

        switch (filterData.op) {
          case 'empty': {
            return !fieldData.value.length;
          }

          case 'not-empty': {
            return !!fieldData.value.length;
          }

          case 'equal': {
            if (isString(filterData.value)) {
              const filterValue = parseFilterValue(filterData.value, fieldData);
              if (filterValue === null) return false;

              return fieldData.value.length === 1 && areEqual(fieldData.value[0], filterValue);
            }

            return (
              fieldData.value.length === filterData.value.length &&
              fieldData.value.every((value) => {
                if (!Array.isArray(filterData.value)) return true;

                return filterData.value.some((rawFilterValue) => {
                  const filterValue = parseFilterValue(rawFilterValue, fieldData);
                  if (filterValue === null) return false;

                  return areEqual(value, filterValue);
                });
              })
            );
          }

          case 'not-equal': {
            if (isString(filterData.value)) {
              const filterValue = parseFilterValue(filterData.value, fieldData);
              if (filterValue === null) return false;

              return fieldData.value.length !== 1 || !areEqual(fieldData.value[0], filterValue);
            }

            return (
              fieldData.value.length !== filterData.value.length ||
              fieldData.value.some((value) => {
                if (!Array.isArray(filterData.value)) return true;

                return filterData.value.every((rawFilterValue) => {
                  const filterValue = parseFilterValue(rawFilterValue, fieldData);
                  if (filterValue === null) return false;

                  return !areEqual(value, filterValue);
                });
              })
            );
          }

          case 'contains': {
            if (isString(filterData.value)) {
              const lowerCaseFilterValue = filterData.value.toLowerCase();

              return fieldData.value.some((value) => {
                const lowerCaseValue = String(value).toLowerCase();
                return lowerCaseValue.includes(lowerCaseFilterValue);
              });
            }

            return filterData.value.some((rawFilterValue) => {
              const filterValue = parseFilterValue(rawFilterValue, fieldData);
              if (filterValue === null) return false;

              return fieldData.value.some((value) => areEqual(value, filterValue));
            });
          }

          case 'not-contains': {
            if (isString(filterData.value)) {
              const lowerCaseFilterValue = filterData.value.toLowerCase();

              return fieldData.value.every((value) => {
                const lowerCaseValue = String(value).toLowerCase();
                return !lowerCaseValue.includes(lowerCaseFilterValue);
              });
            }

            return filterData.value.every((rawFilterValue) => {
              const filterValue = parseFilterValue(rawFilterValue, fieldData);
              if (filterValue === null) return false;

              return fieldData.value.every((value) => !areEqual(value, filterValue));
            });
          }

          case 'greater':
          case 'greater-equal':
          case 'less':
          case 'less-equal': {
            if (fieldData.type !== 'number' && fieldData.type !== 'date') return true;
            if (Array.isArray(filterData.value)) return true;

            const filterValue = parseFilterValue(filterData.value, fieldData);
            if (filterValue === null) return false;

            return fieldData.value.some((fieldValue) => {
              if (isString(filterValue)) return true;

              const numericFieldValue = isNumber(fieldValue) ? fieldValue : fieldValue.getTime();
              const numericFilterValue = isNumber(filterValue) ? filterValue : filterValue.getTime();

              switch (filterData.op) {
                case 'greater': {
                  return numericFieldValue > numericFilterValue;
                }
                case 'greater-equal': {
                  return numericFieldValue >= numericFilterValue;
                }
                case 'less': {
                  return numericFieldValue < numericFilterValue;
                }
                case 'less-equal': {
                  return numericFieldValue <= numericFilterValue;
                }
              }
            });
          }
        }
      };

      return match === 'or' ? conditions.some(conditionsPredicate) : conditions.every(conditionsPredicate);
    };

    return filters.match === 'or' ? filters.groups.some(groupsPredicate) : filters.groups.every(groupsPredicate);
  });

  return filteredItems;
};

/**
 * Parses the filter value based on the field type.
 * @param rawFilterValue
 * @param fieldData
 * @returns The parsed filter value, if it could be parsed. Otherwise, `null`.
 */
const parseFilterValue = (rawFilterValue: string, { type }: ListItemField) => {
  if (type === 'date') {
    const filterValue = normalizeDate(rawFilterValue);

    if (filterValue === undefined || isNaN(filterValue.getTime())) {
      return null;
    }

    return filterValue;
  }

  if (type === 'number') {
    const filterValue = normalizeNumber(rawFilterValue);

    if (filterValue === undefined || isNaN(filterValue)) {
      return null;
    }

    return filterValue;
  }

  return rawFilterValue;
};

/**
 * Checks if two values are equal.
 * @param rawA
 * @param rawB
 */
const areEqual = <Value = ListItemField['value'][number]>(rawA: Value, rawB: Value) => {
  const a = rawA instanceof Date ? rawA.getTime() : rawA;
  const b = rawB instanceof Date ? rawB.getTime() : rawB;

  return a === b;
};
