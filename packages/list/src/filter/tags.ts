import { addListener, cloneNode, isNotEmpty } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';

import type { List } from '../components/List';
import { DEFAULT_FILTER_OPERATOR, SETTINGS } from '../utils/constants';
import { queryElement } from '../utils/selectors';
import type { FilterOperator, Filters } from './types';

const OPERATOR_SYMBOLS: Record<FilterOperator, string> = {
  empty: '∅',
  'not-empty': '!∅',
  contains: '∈',
  'not-contains': '∉',
  equal: '=',
  'not-equal': '≠',
  less: '<',
  'less-equal': '≤',
  greater: '>',
  'greater-equal': '≥',
  fuzzy: '≈',
};

/**
 * Inits the tags for the list.
 * @param list
 * @returns
 */
export const initTags = (list: List) => {
  const tagTemplate = queryElement('tag', { instance: list.instance });
  if (!tagTemplate) return;

  const tagsListTemplate = tagTemplate.parentElement;
  if (!tagsListTemplate) return;

  const tagsListsWrapper = tagsListTemplate.parentElement;
  if (!tagsListsWrapper) return;

  tagTemplate.remove();
  tagsListTemplate.remove();

  const renderedTagLists: Array<{
    element: HTMLElement;
    tags: Map<string, { element: HTMLElement; cleanup: () => void }>;
  }> = [];

  const watcherCleanup = watch(list.filters, (filters: Filters) => {
    filters.groups.forEach((group, groupIndex) => {
      // Get the tag list, if existing
      let tagList = renderedTagLists[groupIndex];

      const tagListIsRendered = !!tagList;

      if (!tagList) {
        tagList = { element: cloneNode(tagsListTemplate), tags: new Map() };
        renderedTagLists[groupIndex] = tagList;
      }

      // Render the tags
      for (const condition of group.conditions) {
        // Get the tag, if existing
        const tagKey = `${condition.field}_${condition.op}`;

        let tag = tagList.tags.get(tagKey);

        const tagIsRendered = !!tag;

        // Remove the tag if the value is empty
        const hasValue = condition.value && (Array.isArray(condition.value) ? condition.value.length : true);
        if (!hasValue) {
          tag?.cleanup();
          continue;
        }

        if (!tag) {
          // TODO: rethink the tag cleanup because it should also remove the filter value!!!!!!
          const element = cloneNode(tagTemplate);
          const removeElement = queryElement('tag-remove', { scope: element });
          const removeCleanup = addListener(removeElement, 'click', () => {
            condition.value = Array.isArray(condition.value) ? [] : '';
          });

          tag = {
            element,
            cleanup: () => {
              removeCleanup();
              tag?.element.remove();
              tagList.tags.delete(tagKey);
            },
          };

          tagList.tags.set(tagKey, tag);
        }

        const fieldElement = queryElement('tag-field', { scope: tag.element });
        const operatorElement = queryElement('tag-operator', { scope: tag.element });
        const valueElement = queryElement('tag-value', { scope: tag.element });
        const operatorOverwriteElements = new Map(
          Object.values(SETTINGS.operator.values)
            .map((operator) => {
              const operatorOverwriteElement = queryElement(`tag-operator-${operator}`, { scope: tag.element });
              if (!operatorOverwriteElement) return;

              return [operator, operatorOverwriteElement] as const;
            })
            .filter(isNotEmpty)
        );

        if (fieldElement) {
          fieldElement.textContent = condition.field;
        }

        if (valueElement) {
          if (!condition.value) {
            valueElement.remove();
          } else {
            const value = Array.isArray(condition.value)
              ? condition.value.join(condition.filterMatch === 'or' ? ' | ' : ' & ')
              : condition.value;

            valueElement.textContent = value;
          }
        }

        const operator = condition.op || DEFAULT_FILTER_OPERATOR;
        const operatorOverwriteElement = operatorOverwriteElements.get(operator);

        if (operatorElement || operatorOverwriteElement) {
          // Overwrite exists
          if (operatorOverwriteElement) {
            operatorElement?.remove();
            operatorOverwriteElements.delete(operator);
          }

          // Fallback
          else if (operatorElement) {
            const operatorSymbol = OPERATOR_SYMBOLS[operator];
            operatorElement.textContent = operatorSymbol;
          }

          // Remove all unused overwrites
          for (const [, element] of operatorOverwriteElements) {
            element.remove();
          }
        }

        if (!tagIsRendered) {
          tagList.element.appendChild(tag.element);
        }
      }

      if (!tagListIsRendered) {
        tagsListsWrapper.appendChild(tagList.element);
      }
    });
  });

  return () => {
    watcherCleanup();

    for (const { tags } of renderedTagLists) {
      for (const [, tag] of tags) {
        tag.cleanup();
      }
    }
  };
};
