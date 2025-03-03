import {
  extractCommaSeparatedValues,
  type FormFieldType,
  isDate,
  isString,
  isUndefined,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';
import type { SearchResult } from 'minisearch';
import MiniSearch from 'minisearch';

import type { ListItemField } from '../components';
import type { FiltersCondition, FiltersGroup, FilterTaskData, PickedListItem } from './types';

self.onmessage = (e: MessageEvent<FilterTaskData>) => {
  let miniSearch: MiniSearch<PickedListItem> | undefined;

  const miniSearchCache = new Map<string, SearchResult[]>();

  const { filters, items } = e.data;

  const filteredItems = items.filter((item) => {
    const groupsPredicate = (groupData: FiltersGroup) => {
      const conditionsPredicate = (filterData: FiltersCondition) => {
        const fieldsPredicate = (field: string) => {
          if (!filterData.field || !filterData.op || !filterData.value) return true;

          const fieldData = item.fields[field];
          if (!fieldData) return false;

          const fieldValue = fieldData.value;
          const rawFilterValue = filterData.value;

          switch (filterData.op) {
            case 'empty': {
              return Array.isArray(fieldValue) ? !fieldValue.length : !fieldValue;
            }

            case 'not-empty': {
              return Array.isArray(fieldValue) ? !!fieldValue.length : !!fieldValue;
            }

            case 'fuzzy': {
              // TODO: check if fuzzy search still works as expected
              if (!isString(rawFilterValue)) return false;

              miniSearch ||= createMiniSearch(items);

              const search =
                miniSearchCache.get(field) || miniSearch.search(rawFilterValue, { fuzzy: filterData.fuzzy });

              miniSearchCache.set(field, search);

              return search.some((result) => result.id === item.id);
            }

            case 'equal': {
              // Both are arrays
              if (Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every filter value, every field value must match, and for every field value, every filter value must match. In practical terms, they must be exactly the same set of values.
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.every((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field must contain it in at least one of its values
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // There must exist at least one filter value which matches all field values
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.every((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, the field must have at least one matching value
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must match all filter values
                  return rawFilterValue.every((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return areEqual(fieldValue, filterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must match at least one filter value
                  return rawFilterValue.some((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return areEqual(fieldValue, filterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // The single filter value must match all field values
                  return fieldValue.every((fieldValue) => areEqual(fieldValue, filterValue));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // The single filter value must match at least one field value
                  return fieldValue.some((fieldValue) => areEqual(fieldValue, filterValue));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                return areEqual(fieldValue, filterValue);
              }
            }

            case 'not-equal': {
              // Both are arrays
              if (Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;
                if (!fieldValue.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // Every filter value must be not equal to every field value.In effect, the sets must have no overlap at all. If they share any exact value, the condition fails.
                  return !rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field (in OR logic) must be “not equal.” In OR logic for the field, you check if there is at least one field value that differs from the filter value. Then all filter values must pass that check
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // In AND logic for the field, all field values must be “not equal” to a chosen filter value for that filter to pass. Then we only need it to be true for at least one filter value (OR)
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.every((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // We need at least one filter value for which the field has at least one non-matching field value
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not match all filter values
                  return rawFilterValue.every((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return !areEqual(fieldValue, filterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not match at least one filter value
                  return rawFilterValue.some((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return !areEqual(fieldValue, filterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return true;

                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must be not equal to the single filter value
                  return fieldValue.every((fieldValue) => !areEqual(fieldValue, filterValue));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must be not equal to the filter value
                  return fieldValue.some((fieldValue) => !areEqual(fieldValue, filterValue));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                return !areEqual(fieldValue, filterValue);
              }
            }

            case 'contain': {
              // Both are arrays
              if (Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must contain all filter strings
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For every filter string, at least one field value must contain it
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter string, all field values must contain it
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter string, at least one field value must contain it
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;

                const lowerCaseFieldValue = fieldValue.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must contain all filter values
                  return rawFilterValue.every((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must contain at least one filter value
                  return rawFilterValue.some((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                const lowerCaseFilterValue = filterValue.toString().toLowerCase();

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must contain the single filter value
                  return fieldValue.every((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must contain the single filter value
                  return fieldValue.some((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                const lowerCaseFieldData = fieldValue.toString().toLowerCase();

                return lowerCaseFieldData.includes(lowerCaseFilterValue);
              }
            }

            case 'not-contain': {
              // Both are arrays
              if (Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;
                if (!fieldValue.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For each field value, it must not contain any of the filter substrings
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter substring, at least one field value must not contain it
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // Each field value must not contain at least one filter substring
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // There must be at least one filter substring that is not contained by at least one field value
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;

                const lowerCaseFieldValue = fieldValue.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not contain each filter substring
                  return rawFilterValue.every((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not contain at least one of the filter substrings
                  return rawFilterValue.some((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return true;

                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                const lowerCaseFilterValue = filterValue.toString().toLowerCase();

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must not contain the single filter value
                  return fieldValue.every((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must not contain the single filter value
                  return fieldValue.some((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                const lowerCaseFieldData = fieldValue.toString().toLowerCase();

                return !lowerCaseFieldData.includes(lowerCaseFilterValue);
              }
            }

            case 'greater':
            case 'greater-equal':
            case 'less':
            case 'less-equal': {
              const operator = filterData.op as 'greater' | 'greater-equal' | 'less' | 'less-equal';

              // Both are arrays
              if (Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must pass the comparison with all filter values
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, there must be at least one field value less than it
                  return rawFilterValue.every((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter value, all field values must pass the comparison
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, there must be at least one field value that passes the comparison
                  return rawFilterValue.some((rawFilterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return fieldValue.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                if (!rawFilterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must pass the comparison with all filter values
                  return rawFilterValue.every((rawFilterValue) => {
                    if (Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return numericCompare(fieldValue, filterValue, operator);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must pass the comparison with at least one filter value
                  return rawFilterValue.some((rawFilterValue) => {
                    if (Array.isArray(fieldValue)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                    if (filterValue === null) return false;

                    return numericCompare(fieldValue, filterValue, operator);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(rawFilterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must pass the comparison with the single filter value
                  return fieldValue.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must pass the comparison with the single filter value
                  return fieldValue.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(rawFilterValue) && !Array.isArray(fieldValue)) {
                const filterValue = parseFilterValue(rawFilterValue, fieldData.type, filterData.type);
                if (filterValue === null) return false;

                return numericCompare(fieldValue, filterValue, operator);
              }
            }
          }
        };

        const fields =
          filterData.field === '*'
            ? Object.keys(items[0]?.fields || {})
            : extractCommaSeparatedValues(filterData.field);

        return filterData.fieldMatch === 'and' ? fields.every(fieldsPredicate) : fields.some(fieldsPredicate);
      };

      return groupData.conditionsMatch === 'or'
        ? groupData.conditions.some(conditionsPredicate)
        : groupData.conditions.every(conditionsPredicate);
    };

    return filters.groupsMatch === 'or' ? filters.groups.some(groupsPredicate) : filters.groups.every(groupsPredicate);
  });

  self.postMessage(filteredItems);
};

/**
 * Parses the filter value based on the field type.
 * @param rawFilterValue
 * @param fieldData
 * @returns The parsed filter value, if it could be parsed. Otherwise, `null`.
 */
const parseFilterValue = (
  rawFilterValue: string | number | Date,
  fieldType: ListItemField['type'],
  filterType: FormFieldType
) => {
  if (
    fieldType === 'date' ||
    filterType === 'date' ||
    filterType === 'time' ||
    filterType === 'datetime-local' ||
    filterType === 'month' ||
    filterType === 'week'
  ) {
    const filterValue = normalizeDate(rawFilterValue);

    if (filterValue === undefined || isNaN(filterValue.getTime())) {
      return null;
    }

    return filterValue;
  }

  if (fieldType === 'number' || filterType === 'number' || filterType === 'range') {
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
const areEqual = (rawA: string | number | Date, rawB: string | number | Date) => {
  // Ensure that dates are compared as dates
  if (typeof rawA !== typeof rawB) {
    if (isDate(rawA)) {
      rawB = normalizeDate(rawB) || rawB;
    } else if (isDate(rawB)) {
      rawA = normalizeDate(rawA) || rawA;
    }
  }

  const a = isDate(rawA) ? rawA.getTime() : isString(rawA) ? rawA.toLowerCase() : rawA;
  const b = isDate(rawB) ? rawB.getTime() : isString(rawB) ? rawB.toLowerCase() : rawB;

  return a === b;
};

/**
 * Compares two numeric values.
 * @param rawA
 * @param rawB
 * @param op
 * @returns `true` if the comparison is successful.
 */
const numericCompare = (
  rawA: string | number | Date,
  rawB: string | number | Date,
  op: 'greater' | 'greater-equal' | 'less' | 'less-equal'
) => {
  const a = isDate(rawA) ? rawA.getTime() : isString(rawA) ? normalizeNumber(rawA) : rawA;
  const b = isDate(rawB) ? rawB.getTime() : isString(rawB) ? normalizeNumber(rawB) : rawB;

  if (isUndefined(a) || isUndefined(b)) return false;

  if (op === 'greater') return a > b;
  if (op === 'greater-equal') return a >= b;
  if (op === 'less') return a < b;
  if (op === 'less-equal') return a <= b;

  return false;
};

/**
 * MiniSearch factory method.
 * @param items
 * @returns A new MiniSearch instance.
 */
const createMiniSearch = (items: PickedListItem[]) => {
  const fields = [
    ...items.reduce<Set<string>>((acc, item) => {
      Object.keys(item.fields).forEach((key) => acc.add(key));
      return acc;
    }, new Set()),
  ];

  const miniSearch = new MiniSearch({
    fields,
    storeFields: fields,
    extractField: (item: PickedListItem, fieldKey) => {
      if (fieldKey === 'id') return item.id;

      const value = item.fields[fieldKey]?.value;

      if (Array.isArray(value)) return value.join(' ');

      return value.toString();
    },
  });

  miniSearch.addAll(items);

  return miniSearch;
};
