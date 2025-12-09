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

  const renderedTagGroups: Map<string, TagGroupData> = new Map();

  const watcherCleanup = watch(
    list.filters,
    (filters: Filters) => {
      // Render the tag groups
      const newRenderedTagGroups = new Map<string, TagGroupData>();

      filters.groups.forEach((group) => {
        // Get the tag list, if existing
        let tagGroupData = renderedTagGroups.get(group.id);

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

              const hasGroups = filters.groups.length > 1;

              if (isDynamic && hasGroups) {
                const groupIndex = filters.groups.findIndex((g) => g.id === group.id);
                filters.groups.splice(groupIndex, 1);
              }
            },
            cleanup: () => {
              removeCleanup();
              tagGroupData?.renderedTags.forEach((tag) => tag.cleanup());
              tagGroupData?.element.remove();
              renderedTagGroups.delete(group.id);
            },
          };

          renderedTagGroups.set(group.id, tagGroupData);
        }

        // Render the tags
        const newRenderedTags = new Map<string, TagData>();

        const hasRenderedTags = group.conditions
          .map((condition) => {
            const conditionValue = condition.value;
            const shouldSeparate = Array.isArray(conditionValue) && condition.tagValuesDisplay === 'separate';

            // Separate tags per value
            if (shouldSeparate) {
              const hasRenderedValues = conditionValue.map((value) => {
                const tagKey = `${condition.id}:${value}`;
                let tagData = tagGroupData.renderedTags.get(tagKey);
                const tagIsRendered = !!tagData;

                const shouldRender = condition.showTag && !!condition.interacted && !!value;
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
                      const hasConditions = group.conditions.length > 1;
                      const conditionIndex = group.conditions.findIndex((c) => c.id === condition.id);
                      const currentValues = group.conditions[conditionIndex].value;

                      if (Array.isArray(currentValues) && currentValues.length > 1) {
                        group.conditions[conditionIndex].value = currentValues.filter((v) => v !== value);
                      } else if (isDynamic && hasConditions) {
                        group.conditions.splice(conditionIndex, 1);
                      } else {
                        group.conditions[conditionIndex].value = [];
                      }
                    },
                    cleanup: () => {
                      removeCleanup();
                      tagData?.element.remove();
                      tagGroupData.renderedTags.delete(tagKey);
                    },
                  };

                  tagGroupData.renderedTags.set(tagKey, tagData);
                }

                // Create a single-value condition for rendering
                const singleValueCondition: FiltersCondition = {
                  ...condition,
                  value,
                };

                populateTag(singleValueCondition, tagData);

                if (!tagIsRendered) {
                  const anchor = tagGroupData.element.children[indexOfTagTemplate + newRenderedTags.size] || null;
                  tagGroupData.element.insertBefore(tagData.element, anchor);
                }

                newRenderedTags.set(tagKey, tagData);

                return true;
              });

              return hasRenderedValues.some(Boolean);
            }

            // Combined tag per all values
            const tagKey = condition.id;
            let tagData = tagGroupData.renderedTags.get(tagKey);
            const tagIsRendered = !!tagData;

            const shouldRender =
              condition.showTag &&
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
                  const hasConditions = group.conditions.length > 1;
                  const conditionIndex = group.conditions.findIndex((c) => c.id === condition.id);

                  if (isDynamic && hasConditions) {
                    group.conditions.splice(conditionIndex, 1);
                  } else {
                    group.conditions[conditionIndex].value = Array.isArray(condition.value) ? [] : '';
                  }
                },
                cleanup: () => {
                  removeCleanup();
                  tagData?.element.remove();
                  tagGroupData.renderedTags.delete(tagKey);
                },
              };

              tagGroupData.renderedTags.set(tagKey, tagData);
            }

            populateTag(condition, tagData);

            if (!tagIsRendered) {
              const anchor = tagGroupData.element.children[indexOfTagTemplate + newRenderedTags.size] || null;
              tagGroupData.element.insertBefore(tagData.element, anchor);
            }

            newRenderedTags.set(tagKey, tagData);

            return true;
          })
          .some(Boolean);

        // Remove the tags that are not rendered anymore
        for (const [id, tagData] of tagGroupData.renderedTags) {
          if (!newRenderedTags.has(id)) {
            tagData.cleanup();
          }
        }

        if (!hasRenderedTags) {
          tagGroupData.cleanup();
          return;
        }

        if (!tagListIsRendered) {
          const anchor = tagsListsWrapper.children[indexOfTagGroupTemplate + newRenderedTagGroups.size] || null;

          tagsListsWrapper.insertBefore(tagGroupData.element, anchor);
        }

        newRenderedTagGroups.set(group.id, tagGroupData);
      });

      // Remove the tag groups that are not rendered anymore
      for (const [id, tagGroupData] of renderedTagGroups) {
        if (!newRenderedTagGroups.has(id)) {
          tagGroupData.cleanup();
        }
      }
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
    fieldElement.textContent = condition.tagCustomField || condition.fieldKey;
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

      // Custom tag values
      if (condition.tagCustomValues) {
        if (Array.isArray(condition.value)) {
          formattedValue = condition.value.map((value) => {
            const customTagValue = condition.tagCustomValues?.get(value);
            return customTagValue || value;
          });
        } else {
          const customTagValue = condition.tagCustomValues?.get(condition.value);
          formattedValue = customTagValue || condition.value;
        }
      }

      // Locale formatting
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
