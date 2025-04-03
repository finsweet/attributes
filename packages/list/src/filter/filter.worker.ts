import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';

import type { FieldValue, FiltersCondition, FiltersGroup, FilterTaskData } from './types';
import { areEqual, numericCompare, parseFilterValue } from './utils';

self.onmessage = (e: MessageEvent<FilterTaskData>) => {
  const { filters, items } = e.data;

  const filteredItems = items.filter((item) => {
    const groupsPredicate = (groupData: FiltersGroup) => {
      const conditionsPredicate = (filterData: FiltersCondition) => {
        const fieldsPredicate = (fieldKey: string) => {
          if (!filterData.op) return true;

          const fieldData = item.fields[fieldKey];
          if (!fieldData) return false;

          const fieldValue = fieldData.value;
          const filterValue = filterData.value;

          switch (filterData.op) {
            case 'empty': {
              return Array.isArray(fieldValue) ? !fieldValue.length : !fieldValue;
            }

            case 'not-empty': {
              return Array.isArray(fieldValue) ? !!fieldValue.length : !!fieldValue;
            }

            case 'equal': {
              if (!filterValue) return true;

              const compare = ({
                fieldValue,
                parsedFilterValue,
                filterValue,
              }: {
                fieldValue: FieldValue;
                parsedFilterValue: FieldValue;
                filterValue: string;
              }) => {
                const match = areEqual(fieldValue, parsedFilterValue, filterData.fuzzyThreshold);
                if (match) {
                  item.matchedFields[fieldKey] ||= [];
                  item.matchedFields[fieldKey].push({ fieldValue, filterValue });

                  return true;
                }
              };

              // Both are arrays
              if (Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every filter value, every field value must match, and for every field value, every filter value must match. In practical terms, they must be exactly the same set of values.
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.every((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field must contain it in at least one of its values
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // There must exist at least one filter value which matches all field values
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.every((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, the field must have at least one matching value
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must match all filter values
                  return filterValue.every((filterValue) => {
                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return compare({ fieldValue, parsedFilterValue, filterValue });
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must match at least one filter value
                  return filterValue.some((filterValue) => {
                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return compare({ fieldValue, parsedFilterValue, filterValue });
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // The single filter value must match all field values
                  return fieldValue.every((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // The single filter value must match at least one field value
                  return fieldValue.some((fieldValue) => compare({ fieldValue, parsedFilterValue, filterValue }));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                return compare({ fieldValue, parsedFilterValue, filterValue });
              }
            }

            case 'not-equal': {
              if (!filterValue) return true;

              const compare = ({
                fieldValue,
                parsedFilterValue,
              }: {
                fieldValue: FieldValue;
                parsedFilterValue: FieldValue;
              }) => areEqual(fieldValue, parsedFilterValue, filterData.fuzzyThreshold);

              // Both are arrays
              if (Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;
                if (!fieldValue.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // Every filter value must be not equal to every field value.In effect, the sets must have no overlap at all. If they share any exact value, the condition fails.
                  return !filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => compare({ fieldValue, parsedFilterValue }));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, the field (in OR logic) must be “not equal.” In OR logic for the field, you check if there is at least one field value that differs from the filter value. Then all filter values must pass that check
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => !compare({ fieldValue, parsedFilterValue }));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // In AND logic for the field, all field values must be “not equal” to a chosen filter value for that filter to pass. Then we only need it to be true for at least one filter value (OR)
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.every((fieldValue) => !compare({ fieldValue, parsedFilterValue }));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // We need at least one filter value for which the field has at least one non-matching field value
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return true;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => !compare({ fieldValue, parsedFilterValue }));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not match all filter values
                  return filterValue.every((filterValue) => {
                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return !compare({ fieldValue, parsedFilterValue });
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not match at least one filter value
                  return filterValue.some((filterValue) => {
                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return !compare({ fieldValue, parsedFilterValue });
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return true;

                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must be not equal to the single filter value
                  return fieldValue.every((fieldValue) => !compare({ fieldValue, parsedFilterValue }));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must be not equal to the filter value
                  return fieldValue.some((fieldValue) => !compare({ fieldValue, parsedFilterValue }));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                return !compare({ fieldValue, parsedFilterValue });
              }
            }

            case 'contain': {
              if (!filterValue) return true;

              const compare = ({
                fieldValue,
                filterValue,
                lowerCaseFieldValue,
                lowerCaseFilterValue,
              }: {
                fieldValue: FieldValue;
                filterValue: string;
                lowerCaseFieldValue: string;
                lowerCaseFilterValue: string;
              }) => {
                const match = lowerCaseFieldValue.includes(lowerCaseFilterValue);
                if (match) {
                  item.matchedFields[fieldKey] ||= [];
                  item.matchedFields[fieldKey].push({ fieldValue, filterValue });

                  return true;
                }
              };

              // Both are arrays
              if (Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must contain all filter strings
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For every filter string, at least one field value must contain it
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter string, all field values must contain it
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter string, at least one field value must contain it
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;

                const lowerCaseFieldValue = fieldValue.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must contain all filter values
                  return filterValue.every((filterValue) => {
                    const lowerCaseFilterValue = filterValue.toLowerCase();
                    return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must contain at least one filter value
                  return filterValue.some((filterValue) => {
                    const lowerCaseFilterValue = filterValue.toLowerCase();
                    return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                const lowerCaseFilterValue = parsedFilterValue.toString().toLowerCase();

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must contain the single filter value
                  return fieldValue.every((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                  });
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must contain the single filter value
                  return fieldValue.some((fieldValue) => {
                    const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                    return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
                  });
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                const lowerCaseFilterValue = filterValue.toLowerCase();
                const lowerCaseFieldValue = fieldValue.toString().toLowerCase();

                return compare({ fieldValue, filterValue, lowerCaseFieldValue, lowerCaseFilterValue });
              }
            }

            case 'not-contain': {
              if (!filterValue) return true;

              // Both are arrays
              if (Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;
                if (!fieldValue.length) return true;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For each field value, it must not contain any of the filter substrings
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter substring, at least one field value must not contain it
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // Each field value must not contain at least one filter substring
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.every((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // There must be at least one filter substring that is not contained by at least one field value
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const lowerCaseFilterValue = filterValue.toLowerCase();

                    return fieldValue.some((fieldValue) => {
                      const lowerCaseFieldValue = fieldValue.toString().toLowerCase();
                      return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                    });
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;

                const lowerCaseFieldValue = fieldValue.toString().toLowerCase();

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must not contain each filter substring
                  return filterValue.every((filterValue) => {
                    const lowerCaseFilterValue = filterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must not contain at least one of the filter substrings
                  return filterValue.some((filterValue) => {
                    const lowerCaseFilterValue = filterValue.toLowerCase();
                    return !lowerCaseFieldValue.includes(lowerCaseFilterValue);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return true;

                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                const lowerCaseFilterValue = parsedFilterValue.toString().toLowerCase();

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
              if (!Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                const lowerCaseFilterValue = filterValue.toLowerCase();
                const lowerCaseFieldData = fieldValue.toString().toLowerCase();

                return !lowerCaseFieldData.includes(lowerCaseFilterValue);
              }
            }

            case 'greater':
            case 'greater-equal':
            case 'less':
            case 'less-equal': {
              if (!filterValue) return true;

              const operator = filterData.op as 'greater' | 'greater-equal' | 'less' | 'less-equal';

              // Both are arrays
              if (Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;
                if (!fieldValue.length) return false;

                // AND / AND
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'and') {
                  // For every field value, it must pass the comparison with all filter values
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.every((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                  });
                }

                // AND / OR
                if (filterData.filterMatch === 'and' && filterData.fieldMatch === 'or') {
                  // For each filter value, there must be at least one field value less than it
                  return filterValue.every((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                  });
                }

                // OR / AND
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'and') {
                  // For at least one filter value, all field values must pass the comparison
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.every((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                  });
                }

                // OR / OR
                if (filterData.filterMatch === 'or' && filterData.fieldMatch === 'or') {
                  // For at least one filter value, there must be at least one field value that passes the comparison
                  return filterValue.some((filterValue) => {
                    if (!Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return fieldValue.some((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                  });
                }
              }

              // Filter is array, field is single
              if (Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                if (!filterValue.length) return true;

                // AND matching
                if (filterData.filterMatch === 'and') {
                  // The single field value must pass the comparison with all filter values
                  return filterValue.every((filterValue) => {
                    if (Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return numericCompare(fieldValue, parsedFilterValue, operator);
                  });
                }

                // OR matching
                if (filterData.filterMatch === 'or') {
                  // The single field value must pass the comparison with at least one filter value
                  return filterValue.some((filterValue) => {
                    if (Array.isArray(fieldValue)) return false;

                    const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                    if (parsedFilterValue === null) return false;

                    return numericCompare(fieldValue, parsedFilterValue, operator);
                  });
                }
              }

              // Filter is single, field is array
              if (!Array.isArray(filterValue) && Array.isArray(fieldValue)) {
                if (!fieldValue.length) return false;

                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                // AND matching
                if (filterData.fieldMatch === 'and') {
                  // All field values must pass the comparison with the single filter value
                  return fieldValue.every((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                }

                // OR matching
                if (filterData.fieldMatch === 'or') {
                  // At least one field value must pass the comparison with the single filter value
                  return fieldValue.some((fieldValue) => numericCompare(fieldValue, parsedFilterValue, operator));
                }
              }

              // Filter is single, field is single
              if (!Array.isArray(filterValue) && !Array.isArray(fieldValue)) {
                const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
                if (parsedFilterValue === null) return false;

                return numericCompare(fieldValue, parsedFilterValue, operator);
              }
            }
          }
        };

        const fields =
          filterData.fieldKey === '*'
            ? Object.keys(items[0]?.fields || {})
            : extractCommaSeparatedValues(filterData.fieldKey);

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
