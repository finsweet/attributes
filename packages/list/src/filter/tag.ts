import { clearFormField, cloneNode } from '@finsweet/attributes-utils';

import { getSettingSelector, queryAllElements, queryElement } from '../utils/selectors';
import type { FiltersData, TagData } from './types';

export const initTag = () => {
  const tagTemplate = queryElement('tag');
  if (!tagTemplate) return;
  const template = cloneNode(tagTemplate);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wrapper = tagTemplate.parentElement!;
  tagTemplate.remove();
  return { template, wrapper };
};

export const handleTags = (filters: FiltersData, tagData: TagData) => {
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
        const tag = cloneNode(tagData.template);
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
        tagData.wrapper.appendChild(tag);
      }
    });
  }
};
