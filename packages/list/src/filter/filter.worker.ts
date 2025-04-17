import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';

import type { FieldValue, FiltersCondition, FiltersGroup, FilterTaskData } from './types';
import { areEqual, numericCompare, parseFilterValue } from './utils';

self.onmessage = (e: MessageEvent<FilterTaskData>) => {
  const { filters, items } = e.data;

  const filteredItems = items.filter((item) => {
    const groupsPredicate = (groupData: FiltersGroup) => {
      const conditionsPredicate = (filterData: FiltersCondition) => {
        const fieldsPredicate = (fieldKey: string) => {
          const { op, filterMatch, fieldMatch } = filterData;
          if (!op) return true;

          const fieldData = item.fields[fieldKey];
          if (!fieldData) return false;

          const fieldValue = fieldData.value;
          const filterValue = filterData.value;

          if (op === 'empty') {
            return Array.isArray(fieldValue) ? !fieldValue.length : !fieldValue;
          }

          if (op === 'not-empty') {
            return Array.isArray(fieldValue) ? !!fieldValue.length : !!fieldValue;
          }

          const isNegative = op.startsWith('not-');

          const compare = (fieldValue: FieldValue, filterValue: string, parsedFilterValue: FieldValue) => {
            let match = false;

            if (op === 'equal' || op === 'not-equal') {
              match = areEqual(fieldValue, parsedFilterValue, filterData.fuzzyThreshold);
            } else if (op === 'start' || op === 'not-start') {
              match = fieldValue.toString().toLowerCase().startsWith(filterValue.toLowerCase());
            } else if (op === 'end' || op === 'not-end') {
              match = fieldValue.toString().toLowerCase().endsWith(filterValue.toLowerCase());
            } else if (op === 'contain' || op === 'not-contain') {
              match = fieldValue.toString().toLowerCase().includes(filterValue.toLowerCase());
            } else if (op === 'greater' || op === 'greater-equal' || op === 'less' || op === 'less-equal') {
              match = numericCompare(fieldValue, parsedFilterValue, op);
            }

            if (match && (op === 'equal' || op === 'contain')) {
              item.matchedFields[fieldKey] ||= [];
              item.matchedFields[fieldKey].push({ fieldValue, filterValue });
            }

            return isNegative ? !match : match;
          };

          const filterValueIsArray = Array.isArray(filterValue);
          const fieldValueIsArray = Array.isArray(fieldValue);
          const emptyFilterValue = filterValue === '' || (filterValueIsArray && !filterValue.length);
          const emptyFieldValue = fieldValue === '' || (fieldValueIsArray && !fieldValue.length);

          if (emptyFilterValue) return groupData.conditionsMatch === 'and';
          if (emptyFieldValue) return isNegative;

          // Both are arrays
          if (filterValueIsArray && fieldValueIsArray) {
            const predicate = (filterValue: string) => {
              const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
              if (parsedFilterValue === null) return false;

              return fieldMatch === 'and'
                ? fieldValue.every((fieldValue) => compare(fieldValue, filterValue, parsedFilterValue))
                : fieldValue.some((fieldValue) => compare(fieldValue, filterValue, parsedFilterValue));
            };

            return filterMatch === 'and' ? filterValue.every(predicate) : filterValue.some(predicate);
          }

          // Filter is array, field is single
          if (filterValueIsArray && !fieldValueIsArray) {
            const predicate = (filterValue: string) => {
              const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
              if (parsedFilterValue === null) return false;

              return compare(fieldValue, filterValue, parsedFilterValue);
            };

            return filterMatch === 'and' ? filterValue.every(predicate) : filterValue.some(predicate);
          }

          // Filter is single, field is array
          if (!filterValueIsArray && fieldValueIsArray) {
            const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
            if (parsedFilterValue === null) return false;

            return fieldMatch === 'and'
              ? fieldValue.every((fieldValue) => compare(fieldValue, filterValue, parsedFilterValue))
              : fieldValue.some((fieldValue) => compare(fieldValue, filterValue, parsedFilterValue));
          }

          // Filter is single, field is single
          if (!filterValueIsArray && !fieldValueIsArray) {
            const parsedFilterValue = parseFilterValue(filterValue, filterData.type, fieldData.type);
            if (parsedFilterValue === null) return false;

            return compare(fieldValue, filterValue, parsedFilterValue);
          }

          // If we reach this point, the filter value is not valid
          return false;
        };

        const fieldKeys =
          filterData.fieldKey === '*'
            ? Object.keys(items[0]?.fields || {})
            : extractCommaSeparatedValues(filterData.fieldKey);

        return filterData.fieldMatch === 'and' ? fieldKeys.every(fieldsPredicate) : fieldKeys.some(fieldsPredicate);
      };

      return groupData.conditionsMatch === 'or'
        ? groupData.conditions.some(conditionsPredicate)
        : groupData.conditions.every(conditionsPredicate);
    };

    return filters.groupsMatch === 'or' ? filters.groups.some(groupsPredicate) : filters.groups.every(groupsPredicate);
  });

  self.postMessage(filteredItems);
};
