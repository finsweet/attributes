import { isNumber } from '@finsweet/attributes-utils';

import type { ListItem } from '../components/ListItem';
import type { Filters } from './types';

export const filterItems = (filters: Filters, items: ListItem[]) => {
  return [];

  // const filteredItems = items.filter((item) => {
  //   // TODO: Support both `and` and `or` modes, this is just supporting `and` mode.
  //   const isValid = Object.values(filters).every((filterData) => {
  //     if (!filterData.value) return true;
  //     if (Array.isArray(filterData.value) && !filterData.value.length) return true;

  //     const fieldKeys = filterData.fieldKeys || Object.keys(item.fields);

  //     return fieldKeys.some((fieldKey) => {
  //       const fieldData = item.fields[fieldKey];
  //       if (!fieldData) return false;

  //       switch (filterData.op) {
  //         case 'exists': {
  //           return !!fieldData.value;
  //         }

  //         case 'not-exists': {
  //           return !fieldData.value;
  //         }

  //         case 'equal':
  //         case 'not-equal': {
  //           // Multiple
  //           if (filterData.type === 'multiple') {
  //             const fieldValue = fieldData.value;

  //             return filterData.value.some((filterValue) => {
  //               return filterData.op === 'equal'
  //                 ? fieldValue.some((value) => value === filterValue)
  //                 : // @ts-expect-error weird type inference breaks TS here
  //                   fieldValue.every((value) => value !== filterValue);
  //             });
  //           }

  //           // Date
  //           if (filterData.type === 'date') {
  //             if (fieldData.type !== 'date') return false;

  //             const fieldValue = fieldData.value;
  //             const filterTime = filterData.value?.getTime();

  //             if (!filterTime) return false;

  //             return filterData.op === 'equal'
  //               ? fieldValue.some((value) => filterTime === value.getTime())
  //               : fieldValue.every((value) => filterTime !== value.getTime());
  //           }

  //           // Number
  //           if (filterData.type === 'number') {
  //             if (fieldData.type !== 'number') return false;

  //             const fieldValue = fieldData.value;

  //             return filterData.op === 'equal'
  //               ? fieldValue.some((value) => filterData.value === value)
  //               : fieldValue.every((value) => filterData.value !== value);
  //           }

  //           // Other
  //           const filterValue = String(filterData.value);
  //           const fieldValue = fieldData.value;

  //           const lowerCaseFilterValue = filterValue.toLowerCase();

  //           return filterData.op === 'equal'
  //             ? fieldValue.some((value) => String(value).toLowerCase() === lowerCaseFilterValue)
  //             : // @ts-expect-error weird type inference breaks TS here
  //               fieldValue.every((value) => String(value).toLowerCase() !== lowerCaseFilterValue);
  //         }

  //         case 'greater':
  //         case 'greater-equal':
  //         case 'less':
  //         case 'less-equal': {
  //           if (filterData.type !== 'number' && filterData.type !== 'date') return false;
  //           if (fieldData.type !== 'number' && fieldData.type !== 'date') return false;

  //           const fieldValue = fieldData.value;
  //           const filterValue = filterData.type === 'date' ? filterData.value?.getTime() : filterData.value;

  //           if (!isNumber(filterValue)) return false;

  //           return fieldValue.some((value) => {
  //             const numberValue = isNumber(value) ? value : value.getTime();

  //             switch (filterData.op) {
  //               case 'greater': {
  //                 return numberValue > filterValue;
  //               }
  //               case 'greater-equal': {
  //                 return numberValue >= filterValue;
  //               }
  //               case 'less': {
  //                 return numberValue < filterValue;
  //               }
  //               case 'less-equal': {
  //                 return numberValue <= filterValue;
  //               }
  //             }
  //           });
  //         }

  //         case 'contains':
  //         case 'not-contains': {
  //           if (filterData.type === 'multiple') {
  //             return filterData.op === 'contains'
  //               ? filterData.value.some((filterValue) => {
  //                   const fieldValue = fieldData.value;

  //                   return fieldValue.some((value) => value === filterValue);
  //                 })
  //               : filterData.value.every((filterValue) => {
  //                   const fieldValue = fieldData.value;

  //                   // @ts-expect-error weird type inference breaks TS here
  //                   return fieldValue.every((value) => value !== filterValue);
  //                 });
  //           }

  //           const fieldValue = fieldData.value;
  //           const lowerCaseFilterValue = String(filterData.value).toLowerCase();

  //           return filterData.op === 'contains'
  //             ? fieldValue.some((value) => String(value).toLowerCase().includes(lowerCaseFilterValue))
  //             : // @ts-expect-error weird type inference breaks TS here
  //               fieldValue.every((value) => !String(value).toLowerCase().includes(lowerCaseFilterValue));
  //         }
  //       }
  //     });
  //   });

  //   return isValid;
  // });

  // return filteredItems;
};
