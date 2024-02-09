import { clearFormField, cloneNode } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { getInstanceIndex, getSettingSelector, queryAllElements, queryElement } from '../utils/selectors';
import type { FiltersData } from './types';

export const initTag = (list: List) => {
  if (!list.listElement) return;
  const instanceIndex = getInstanceIndex(list.listElement);
  const tagTemplate = queryElement('tag', { instanceIndex: instanceIndex });
  if (!tagTemplate) return;
  const template = cloneNode(tagTemplate);
  const wrapper = tagTemplate.parentElement;
  if (!wrapper) return;
  tagTemplate.remove();

  list.filters.subscribe((filters) => {
    handleTags(filters, template, wrapper);
  });
};

export const handleTags = (filters: FiltersData, template: HTMLElement, wrapper: HTMLElement) => {
  const activeFilters = queryAllElements('tag');

  activeFilters.forEach((tag) => {
    const value = queryElement('tag-value', { scope: tag })?.textContent;
    const key = queryElement('tag-field', { scope: tag })?.textContent;

    if (key && value) {
      const filterValue = filters[key].value;

      if (Array.isArray(filterValue) && !filterValue.includes(value)) {
        tag.remove();
      }

      if (!Array.isArray(filterValue) && filterValue !== value) {
        tag.remove();
      }
    }
  });

  for (const filterKey in filters) {
    const filterValues = (
      Array.isArray(filters[filterKey].value) ? filters[filterKey].value : [filters[filterKey].value]
    ) as string[];

    filterValues?.forEach((filterValue) => {
      const stringValue = String(filterValue || '');

      const existingTag = activeFilters.find((tag) => {
        const tagValue = queryElement('tag-value', { scope: tag })?.textContent;
        const tagKey = queryElement('tag-field', { scope: tag })?.textContent;
        return tagKey === filterKey && tagValue === stringValue;
      });

      if (!existingTag && stringValue.length > 0) {
        const tag = cloneNode(template);
        const tagText = queryElement('tag-value', { scope: tag });
        const tagField = queryElement('tag-field', { scope: tag });
        const tagOperator = queryElement('tag-operator', { scope: tag });
        if (tagText) tagText.innerHTML = stringValue;
        if (tagField) tagField.innerHTML = filterKey;
        if (tagOperator) tagOperator.innerHTML = ':';
        const removeButton = queryElement('tag-remove', { scope: tag });
        if (removeButton) {
          removeButton.addEventListener('click', () => {
            const valueSelector = getSettingSelector('value').replace(/[\[\]]/g, '');
            const keySelector = getSettingSelector('field').replace(/[\[\]]/g, '');
            const multipleSelector = `input[${valueSelector}="${stringValue}"][${keySelector}="${filterKey}"]`;
            const multipleTypeToClear = document.querySelector<HTMLInputElement>(multipleSelector);

            if (multipleTypeToClear) {
              clearFormField(multipleTypeToClear);
            } else {
              const singleSelector = `input[${keySelector}="${filterKey}"]`;
              const singleTypeToClear = document.querySelector<HTMLInputElement>(singleSelector);
              if (singleTypeToClear) clearFormField(singleTypeToClear);
            }
            tag.remove();
          });
        }
        wrapper.appendChild(tag);
      }
    });
  }
};
