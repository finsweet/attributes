import { extractCommaSeparatedValues, isString, normalizeDate, normalizeNumber } from '@finsweet/attributes-utils';
import type { SearchResult } from 'minisearch';
import type MiniSearch from 'minisearch';

import type { ListItem, ListItemField } from '../components/ListItem';
import type { Filters, FiltersCondition, FiltersGroup } from './types';

export const filterItems = (filters: Filters, items: ListItem[], fuzzySearch?: MiniSearch) => {
  const fuzzySearchCache = new Map<string, SearchResult[]>();

  const filteredItems = items.filter((item) => {
    const groupsPredicate = (groupData: FiltersGroup) => {
      const conditionsPredicate = (filterData: FiltersCondition) => {
        const fieldsPredicate = (field: string) => {
          if (!filterData.field || !filterData.op || !filterData.value) return true;

          const fieldData = item.fields[field];
          if (!fieldData) return false;

          switch (filterData.op) {
            case 'empty': {
              return Array.isArray(fieldData.value) ? !fieldData.value.length : !fieldData.value;
            }

            case 'not-empty': {
              return Array.isArray(fieldData.value) ? !!fieldData.value.length : !!fieldData.value;
            }

            case 'fuzzy': {
              // TODO: check if fuzzy search still works as expected
              if (!fuzzySearch) return true;
              if (!isString(filterData.value)) return false;

              const search =
                fuzzySearchCache.get(field) || fuzzySearch.search(filterData.value, { fuzzy: filterData.fuzzy });

              fuzzySearchCache.set(field, search);

              return search.some((result) => result.id === item.id);
            }

            case 'equal': {
              // Both are arrays
              if (Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;
                if (!fieldData.value.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every filter value, every field value must match, and for every field value, every filter value must match. In practical terms, they must be exactly the same set of values.
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.every((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field must contain it in at least one of its values
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // There must exist at least one filter value which matches all field values
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.every((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, the field must have at least one matching value
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must match all filter values
                  return filterData.value.every((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return areEqual(fieldData.value, filterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must match at least one filter value
                  return filterData.value.some((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return areEqual(fieldData.value, filterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!fieldData.value.length) return false;

                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // The single filter value must match all field values
                  return fieldData.value.every((fieldValue) => areEqual(fieldValue, filterValue));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // The single filter value must match at least one field value
                  return fieldData.value.some((fieldValue) => areEqual(fieldValue, filterValue));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                return areEqual(fieldData.value, filterValue);
              }
            }

            case 'not-equal': {
              // Both are arrays
              if (Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;
                if (!fieldData.value.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // Every filter value must be not equal to every field value.In effect, the sets must have no overlap at all. If they share any exact value, the condition fails.
                  return !filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => areEqual(fieldValue, filterValue));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field (in OR logic) must be “not equal.” In OR logic for the field, you check if there is at least one field value that differs from the filter value. Then all filter values must pass that check
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // In AND logic for the field, all field values must be “not equal” to a chosen filter value for that filter to pass. Then we only need it to be true for at least one filter value (OR)
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.every((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // We need at least one filter value for which the field has at least one non-matching field value
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return true;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => !areEqual(fieldValue, filterValue));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not match all filter values
                  return filterData.value.every((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return !areEqual(fieldData.value, filterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not match at least one filter value
                  return filterData.value.some((rawFilterValue) => {
                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return !areEqual(fieldData.value, filterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!fieldData.value.length) return true;

                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must be not equal to the single filter value
                  return fieldData.value.every((fieldValue) => !areEqual(fieldValue, filterValue));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must be not equal to the filter value
                  return fieldData.value.some((fieldValue) => !areEqual(fieldValue, filterValue));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                return !areEqual(fieldData.value, filterValue);
              }
            }

            case 'contains': {
              // Both are arrays
              if (Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;
                if (!fieldData.value.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must contain all filter strings
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For every filter string, at least one field value must contain it
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter string, all field values must contain it
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter string, at least one field value must contain it
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;

                const lowerCaseFieldValue = fieldData.value.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must contain all filter values
                  return filterData.value.every((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must contain at least one filter value
                  return filterData.value.some((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!fieldData.value.length) return false;

                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                const lowerCaseFilterValue = filterValue.toString().toLowerCase();

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must contain the single filter value
                  return fieldData.value.every((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must contain the single filter value
                  return fieldData.value.some((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                const lowerCaseFilterValue = filterData.value.toLowerCase();
                const lowerCaseFieldData = fieldData.value.toString().toLowerCase();

                return lowerCaseFieldData.includes(lowerCaseFilterValue);
              }
            }

            case 'not-contains': {
              // Both are arrays
              if (Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;
                if (!fieldData.value.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For each field value, it must not contain any of the filter substrings
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter substring, at least one field value must not contain it
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // Each field value must not contain at least one filter substring
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // There must be at least one filter substring that is not contained by at least one field value
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();

                    return fieldData.value.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;

                const lowerCaseFieldValue = fieldData.value.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not contain each filter substring
                  return filterData.value.every((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not contain at least one of the filter substrings
                  return filterData.value.some((rawFilterValue) => {
                    const lowerCaseFilterValue = rawFilterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!fieldData.value.length) return true;

                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                const lowerCaseFilterValue = filterValue.toString().toLowerCase();

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must not contain the single filter value
                  return fieldData.value.every((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must not contain the single filter value
                  return fieldData.value.some((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                const lowerCaseFilterValue = filterData.value.toLowerCase();
                const lowerCaseFieldData = fieldData.value.toString().toLowerCase();

                return !lowerCaseFieldData.includes(lowerCaseFilterValue);
              }
            }

            case 'greater':
            case 'greater-equal':
            case 'less':
            case 'less-equal': {
              const operator = filterData.op as 'greater' | 'greater-equal' | 'less' | 'less-equal';

              // Both are arrays
              if (Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;
                if (!fieldData.value.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must pass the comparison with all filter values
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, there must be at least one field value less than it
                  return filterData.value.every((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter value, all field values must pass the comparison
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, there must be at least one field value that passes the comparison
                  return filterData.value.some((rawFilterValue) => {
                    if (!Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return fieldData.value.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                if (!filterData.value.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must pass the comparison with all filter values
                  return filterData.value.every((rawFilterValue) => {
                    if (Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return numericCompare(fieldData.value, filterValue, operator);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must pass the comparison with at least one filter value
                  return filterData.value.some((rawFilterValue) => {
                    if (Array.isArray(fieldData.value)) return false;

                    const filterValue = parseFilterValue(rawFilterValue, fieldData);
                    if (filterValue === null) return false;

                    return numericCompare(fieldData.value, filterValue, operator);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterData.value) && Array.isArray(fieldData.value)) {
                if (!fieldData.value.length) return false;

                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must pass the comparison with the single filter value
                  return fieldData.value.every((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must pass the comparison with the single filter value
                  return fieldData.value.some((fieldValue) => numericCompare(fieldValue, filterValue, operator));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterData.value) && !Array.isArray(fieldData.value)) {
                const filterValue = parseFilterValue(filterData.value, fieldData);
                if (filterValue === null) return false;

                return numericCompare(fieldData.value, filterValue, operator);
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

      return groupData.match === 'or'
        ? groupData.conditions.some(conditionsPredicate)
        : groupData.conditions.every(conditionsPredicate);
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
const areEqual = <Value = string | number | Date>(rawA: Value, rawB: Value) => {
  const a = rawA instanceof Date ? rawA.getTime() : isString(rawA) ? rawA.toLowerCase() : rawA;
  const b = rawB instanceof Date ? rawB.getTime() : isString(rawB) ? rawB.toLowerCase() : rawB;

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
  if (isString(rawA) || isString(rawB)) return false;

  const a = rawA instanceof Date ? rawA.getTime() : rawA;
  const b = rawB instanceof Date ? rawB.getTime() : rawB;

  if (op === 'greater') return a > b;
  if (op === 'greater-equal') return a >= b;
  if (op === 'less') return a < b;
  if (op === 'less-equal') return a <= b;

  return false;
};
