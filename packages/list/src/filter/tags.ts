import { clearFormField, cloneNode } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getInstance, getSettingSelector, queryAllElements, queryElement } from '../utils/selectors';

export const initTags = (list: List) => {
  const instance = getInstance(list.listOrWrapper);
  const tagTemplate = queryElement('tag', { instance });
  if (!tagTemplate) return;

  const tagsWrapper = tagTemplate.parentElement;
  if (!tagsWrapper) return;

  tagTemplate.remove();

  const tags = new Map<string, HTMLElement>();

  // list.filters.subscribe((filters, changedKey) => {
  //   const handleTag = (filterKey: string) => {
  //     const filterData = filters[filterKey];

  //     let tagElement = tags.get(filterKey);

  //     const shouldRemove =
  //       filterData.value === null ||
  //       filterData.value === '' ||
  //       (Array.isArray(filterData.value) && !filterData.value.length);

  //     if (shouldRemove) {
  //       tagElement?.remove();
  //       tags.delete(filterKey);
  //       return;
  //     }

  //     const isRendered = !!tagElement;

  //     if (!tagElement) {
  //       tagElement = cloneNode(tagTemplate);
  //     }

  //     updateTag(tagElement, filterData);

  //     if (!isRendered) {
  //       tagsWrapper.append(tagElement);
  //     }

  //     tags.set(filterKey, tagElement);
  //   };

  //   // If a specific filter changed, only handle that one
  //   if (changedKey) {
  //     handleTag(changedKey);
  //   }

  //   // Otherwise, handle all filters
  //   else {
  //     for (const filterKey in filters) {
  //       handleTag(filterKey);
  //     }
  //   }
  // });
};

// const updateTag = (tagElement: HTMLElement, filterData: FilterData) => {
//   const tagValue = queryElement('tag-value', { scope: tagElement });
//   const tagField = queryElement('tag-field', { scope: tagElement });
//   const tagOperator = queryElement('tag-operator', { scope: tagElement });

//   if (tagValue) tagValue.innerHTML = String(filterData.value);
//   if (tagField) tagField.innerHTML = filterData.fieldKeys?.join(', ') || '';
//   if (tagOperator) tagOperator.innerHTML = filterData.op;
// };

// export const handleTags = (filters: FiltersData, template: HTMLElement, wrapper: HTMLElement) => {
//   const activeFilters = queryAllElements('tag');

//   activeFilters.forEach((tag) => {
//     const value = queryElement('tag-value', { scope: tag })?.textContent;
//     const key = queryElement('tag-field', { scope: tag })?.textContent;

//     if (key && value) {
//       const filterValue = filters[key].value;

//       if (Array.isArray(filterValue) && !filterValue.includes(value)) {
//         tag.remove();
//       }

//       if (!Array.isArray(filterValue) && filterValue !== value) {
//         tag.remove();
//       }
//     }
//   });

//   for (const filterKey in filters) {
//     const filterValues = (
//       Array.isArray(filters[filterKey].value) ? filters[filterKey].value : [filters[filterKey].value]
//     ) as string[];

//     filterValues?.forEach((filterValue) => {
//       const stringValue = String(filterValue || '');

//       const existingTag = activeFilters.find((tag) => {
//         const tagValue = queryElement('tag-value', { scope: tag })?.textContent;
//         const tagKey = queryElement('tag-field', { scope: tag })?.textContent;
//         return tagKey === filterKey && tagValue === stringValue;
//       });

//       if (!existingTag && stringValue.length > 0) {
//         const tag = cloneNode(template);
//         const tagText = queryElement('tag-value', { scope: tag });
//         const tagField = queryElement('tag-field', { scope: tag });
//         const tagOperator = queryElement('tag-operator', { scope: tag });
//         if (tagText) tagText.innerHTML = stringValue;
//         if (tagField) tagField.innerHTML = filterKey;
//         if (tagOperator) tagOperator.innerHTML = ':';
//         const removeButton = queryElement('tag-remove', { scope: tag });
//         if (removeButton) {
//           removeButton.addEventListener('click', () => {
//             const valueSelector = getSettingSelector('value').replace(/[\[\]]/g, '');
//             const keySelector = getSettingSelector('field').replace(/[\[\]]/g, '');
//             const multipleSelector = `input[${valueSelector}="${stringValue}"][${keySelector}="${filterKey}"]`;
//             const multipleTypeToClear = document.querySelector<HTMLInputElement>(multipleSelector);

//             if (multipleTypeToClear) {
//               clearFormField(multipleTypeToClear);
//             } else {
//               const singleSelector = `input[${keySelector}="${filterKey}"]`;
//               const singleTypeToClear = document.querySelector<HTMLInputElement>(singleSelector);
//               if (singleTypeToClear) clearFormField(singleTypeToClear);
//             }
//             tag.remove();
//           });
//         }
//         wrapper.appendChild(tag);
//       }
//     });
//   }
// };
