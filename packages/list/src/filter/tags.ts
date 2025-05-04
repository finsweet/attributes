import { addListener, cloneNode, isDate, isNotEmpty, isNumber } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';

import type { List } from '../components/List';
import { SETTINGS } from '../utils/constants';
import { getAttribute, getElementSelector, queryElement } from '../utils/selectors';
import type { FilterOperator, Filters, FiltersCondition } from './types';
import { parseFilterValue } from './utils';

type TagData = {
  element: HTMLElement;
  remove: () => void;
  cleanup: () => void;
};

type TagGroupData = {
  element: HTMLElement;
  renderedTags: Map<string, TagData>;
  remove: () => void;
  cleanup: () => void;
};

const OPERATOR_SYMBOLS: Record<FilterOperator, string> = {
  empty: '∅',
  'not-empty': '!∅',
  contain: '⊃',
  'not-contain': '⊅',
  start: '⋀',
  'not-start': '⋀̸',
  end: '⋁',
  'not-end': '⋁̸',
  equal: '=',
  'not-equal': '≠',
  less: '<',
  'less-equal': '≤',
  greater: '>',
  'greater-equal': '≥',
};

/**
 * Inits the tags for the list.
 * @param list
 * @param isDynamic Defines if the filters are dynamic or not
 * @returns A cleanup function
 */
export const initTags = (list: List, isDynamic: boolean) => {
  const tagTemplate = queryElement('tag', { instance: list.instance });
  if (!tagTemplate) return;

  const tagGroupTemplate =
    tagTemplate.closest<HTMLElement>(getElementSelector('tag-group')) || tagTemplate.parentElement;
  if (!tagGroupTemplate) return;

  const tagsListsWrapper = tagGroupTemplate.parentNode;
  if (!tagsListsWrapper) return;

  const indexOfTagTemplate = Array.from(tagGroupTemplate.children).indexOf(tagTemplate);
  const indexOfTagGroupTemplate = Array.from(tagsListsWrapper.children).indexOf(tagGroupTemplate);

  tagGroupTemplate.remove();
  tagTemplate.remove();

  const renderedTagGroups: Map<number, TagGroupData> = new Map();

  const watcherCleanup = watch(
    list.filters,
    (filters: Filters) => {
      // Render the tag groups
      let renderedGroups = 0;

      filters.groups.forEach((group, groupIndex) => {
        // Get the tag list, if existing
        let tagGroupData = renderedTagGroups.get(groupIndex);

        const tagListIsRendered = !!tagGroupData;

        if (!tagGroupData) {
          const element = cloneNode(tagGroupTemplate);
          const removeElement = queryElement('tag-group-remove', { scope: element });
          const removeCleanup = addListener(removeElement, 'click', () => {
            tagGroupData?.remove();
          });

          tagGroupData = {
            element,
            renderedTags: new Map(),
            remove: () => {
              tagGroupData?.renderedTags.forEach((tag) => tag.remove());

              if (isDynamic) {
                filters.groups.splice(groupIndex, 1);
              }
            },
            cleanup: () => {
              removeCleanup();
              tagGroupData?.renderedTags.forEach((tag) => tag.cleanup());
              tagGroupData?.element.remove();
              renderedTagGroups.delete(groupIndex);
            },
          };

          renderedTagGroups.set(groupIndex, tagGroupData);
        }

        // Render the tags
        let renderedTags = 0;

        const shouldRender = group.conditions
          .map((condition, conditionIndex) => {
            // Get the tag, if existing
            let tagData = tagGroupData.renderedTags.get(condition.id);

            const tagIsRendered = !!tagData;

            // Remove the tag if the value is empty
            const shouldRender =
              !!condition.interacted &&
              !!condition.value &&
              (Array.isArray(condition.value) ? !!condition.value.length : true);

            if (!shouldRender) {
              tagData?.cleanup();
              return false;
            }

            if (!tagData) {
              const element = cloneNode(tagTemplate);
              const removeElement = queryElement('tag-remove', { scope: element });
              const removeCleanup = addListener(removeElement, 'click', () => tagData?.remove());

              tagData = {
                element,
                remove: () => {
                  const existingConditions = filters.groups[groupIndex].conditions.length;

                  if (isDynamic && existingConditions > 1) {
                    console.log({ conditions: filters.groups[groupIndex].conditions, conditionIndex });

                    filters.groups[groupIndex].conditions.splice(conditionIndex, 1);
                  } else {
                    filters.groups[groupIndex].conditions[conditionIndex].value = Array.isArray(condition.value)
                      ? []
                      : '';
                  }
                },
                cleanup: () => {
                  removeCleanup();
                  tagData?.element.remove();
                  tagGroupData.renderedTags.delete(condition.id);
                },
              };

              tagGroupData.renderedTags.set(condition.id, tagData);
            }

            populateTag(condition, tagData);

            if (!tagIsRendered) {
              const anchor = tagGroupData.element.children[indexOfTagTemplate + renderedTags] || null;

              tagGroupData.element.insertBefore(tagData.element, anchor);
            }

            renderedTags += 1;

            return true;
          })
          .some(Boolean);

        if (!shouldRender) {
          tagGroupData?.cleanup();
          return;
        }

        if (!tagListIsRendered) {
          const anchor = tagsListsWrapper.children[indexOfTagGroupTemplate + renderedGroups] || null;

          tagsListsWrapper.insertBefore(tagGroupData.element, anchor);
        }

        renderedGroups += 1;
      });
    },
    { deep: true }
  );

  return () => {
    watcherCleanup();

    for (const [, { cleanup }] of renderedTagGroups) {
      cleanup();
    }
  };
};

/**
 * Populates a tag with the condition data.
 * @param condition
 * @param tagData
 */
const populateTag = (condition: FiltersCondition, tagData: TagData) => {
  const scope = tagData.element;

  const fieldElement = queryElement('tag-field', { scope });
  const operatorElement = queryElement('tag-operator', { scope });
  const valueElement = queryElement('tag-value', { scope });

  const operatorOverwriteElements = new Map(
    SETTINGS.operator.values
      .map((operator) => {
        const operatorOverwriteElement = queryElement(`tag-operator-${operator}`, { scope });
        if (!operatorOverwriteElement) return;

        return [operator, operatorOverwriteElement] as const;
      })
      .filter(isNotEmpty)
  );

  // Field
  if (fieldElement) {
    fieldElement.textContent = condition.customTagField || condition.fieldKey;
  }

  // Operator
  const operator = condition.op;

  if (operator) {
    const operatorOverwriteElement = operatorOverwriteElements.get(operator);

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

  // Value
  if (valueElement) {
    // No value
    if (!condition.value) {
      valueElement.remove();
    }

    // Has value
    else {
      // Format the value, if needed
      let formattedValue = condition.value;

      const formatDisplay = getAttribute(valueElement, 'formatdisplay');
      if (formatDisplay) {
        const locale = formatDisplay === 'true' ? undefined : formatDisplay;

        if (Array.isArray(condition.value)) {
          formattedValue = condition.value.map((value) => {
            const parsedValue = parseFilterValue(value, condition.type);

            if (isNumber(parsedValue)) {
              return parsedValue.toLocaleString(locale);
            }

            if (isDate(parsedValue)) {
              return parsedValue.toLocaleDateString(locale);
            }

            return value;
          });
        } else {
          const parsedValue = parseFilterValue(condition.value, condition.type);

          if (isNumber(parsedValue)) {
            formattedValue = parsedValue.toLocaleString(locale);
          }

          if (isDate(parsedValue)) {
            formattedValue = parsedValue.toLocaleDateString(locale);
          }
        }
      }

      // Set the value
      const value = Array.isArray(formattedValue)
        ? formattedValue.join(condition.filterMatch === 'and' ? ' & ' : ' | ')
        : formattedValue;

      valueElement.textContent = value;
    }
  }
};
