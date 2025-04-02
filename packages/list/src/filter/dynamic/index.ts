import { cloneNode, type FormField } from '@finsweet/attributes-utils';
import { shallowRef } from '@vue/reactivity';

import type { List } from '../../components/List';
import { queryAllElements, queryElement } from '../../utils/selectors';
import type { FilterMatch, FilterOperator, Filters, FiltersCondition, FiltersGroup } from '../types';
import { type ConditionGroup, initConditionGroup, initConditionGroupsAdd, initConditionGroupsMatch } from './groups';
import { getFilterMatchValue } from './utils';

/**
 * Inits dynamic filters for a list.
 * @param list
 * @param form
 * @returns A cleanup function
 */
export const initDynamicFilters = (list: List, form: HTMLFormElement) => {
  const conditionGroupElement = queryElement('condition-group', { scope: form });
  if (!conditionGroupElement) return;

  const conditionGroupsWrapper = conditionGroupElement.parentElement;
  if (!conditionGroupsWrapper) return;

  const conditionGroupTemplate = cloneNode(conditionGroupElement);
  const conditionGroups = shallowRef<ConditionGroup[]>([]);

  const cleanups = new Set<() => void>();

  // Handle condition groups matching
  let groupsMatch: FilterMatch = 'and';

  const conditionGroupMatchSelect =
    queryElement<HTMLSelectElement>('condition-group-match', { scope: form }) ||
    queryElement<HTMLSelectElement>('condition-groups-match', { scope: form });

  if (conditionGroupMatchSelect) {
    groupsMatch = getFilterMatchValue(conditionGroupMatchSelect);

    const cleanup = initConditionGroupsMatch(list, conditionGroupMatchSelect, conditionGroups);
    cleanups.add(cleanup);
  }

  // Handle adding condition groups
  const conditionGroupAddButton =
    queryElement('condition-group-add', { scope: form }) || queryElement('condition-groups-add', { scope: form });

  if (conditionGroupAddButton) {
    const cleanup = initConditionGroupsAdd(
      list,
      conditionGroupAddButton,
      conditionGroupTemplate,
      conditionGroupsWrapper,
      conditionGroups
    );

    cleanups.add(cleanup);
  }

  // Get initial filters
  list.filters.value.groupsMatch = groupsMatch;

  // Init default condition group
  initConditionGroup(list, conditionGroupElement, conditionGroups);

  // Get filters on node changes
  // TODO: Prevent conditions addition/removal to trigger the mutation observer
  // const mutationObserver = new MutationObserver(() => {
  //   list.filters.value = getAdvancedFilters(form);
  // });

  // mutationObserver.observe(form, {
  //   childList: true,
  //   subtree: true,
  // });

  return () => {
    for (const conditionGroup of conditionGroups.value) {
      conditionGroup.cleanup();
    }

    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
  };
};

/**
 * @returns The value of a given form field.
 * @param conditionValue
 */
export const getConditionValue = (conditionValue?: FormField | null) => {
  if (!conditionValue) return '';

  const value =
    conditionValue instanceof HTMLInputElement
      ? conditionValue.type === 'checkbox'
        ? String(conditionValue.checked)
        : conditionValue.value
      : conditionValue.value;

  return value;
};

/**
 * Gets the advanced filters from a form
 * @param form
 */
const getAdvancedFilters = (form: HTMLFormElement) => {
  const conditionGroupMatch = queryElement<HTMLSelectElement>('condition-group-match', { scope: form });
  const groupsMatch = (conditionGroupMatch?.value || 'and') as FilterMatch;

  const conditionGroups = queryAllElements('condition-group', { scope: form });
  const groups = conditionGroups.map((conditionGroup) => {
    const conditionMatch = queryElement<HTMLSelectElement>('condition-match', { scope: conditionGroup });
    const conditionsMatch = (conditionMatch?.value || 'and') as FilterMatch;

    const conditions = queryAllElements('condition', { scope: conditionGroup }).reduce<FiltersCondition[]>(
      (acc, condition) => {
        const conditionField = queryElement<HTMLSelectElement>('condition-field', { scope: condition });
        const fieldKey = conditionField?.value;
        if (!fieldKey) return acc;

        const conditionOperator = queryElement<HTMLSelectElement>('condition-operator', { scope: condition });
        const op = conditionOperator?.value as FilterOperator;
        if (!op) return acc;

        const conditionValue = queryElement<FormField>('condition-value', { scope: condition });
        const value = getConditionValue(conditionValue);
        if (!value) return acc;

        acc.push({
          fieldKey,
          op,
          value,
          fieldMatch: 'or', // TODO
          filterMatch: 'or', // TODO
          type: 'select-one', // TODO
        });

        return acc;
      },
      []
    );

    return { conditionsMatch, conditions } satisfies FiltersGroup;
  });

  return { groupsMatch, groups } satisfies Filters;
};
