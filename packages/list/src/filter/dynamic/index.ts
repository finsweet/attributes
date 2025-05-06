import { addListener, cloneNode } from '@finsweet/attributes-utils';
import { shallowRef, watch } from '@vue/reactivity';

import type { List } from '../../components/List';
import { getElementSelector, queryElement } from '../../utils/selectors';
import { handleFiltersForm } from '../elements';
import type { FilterMatch } from '../types';
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

  watch(list.filters, (f) => console.log(f), { deep: true });

  const conditionGroupTemplate = cloneNode(conditionGroupElement);
  const conditionGroups = shallowRef<ConditionGroup[]>([]);

  const cleanups = new Set<() => void>();

  // Handle submissions
  const formElementCleanup = handleFiltersForm(form);
  cleanups.add(formElementCleanup);

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

  list.filters.value.groupsMatch = groupsMatch;

  // Handle global clear buttons
  const clearCleanup = handleClearButtons(list);
  cleanups.add(clearCleanup);

  // Init default condition group
  initConditionGroup(list, conditionGroupElement, conditionGroups);

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
 * Handles the clear buttons.
 * @param list
 * @returns A cleanup function.
 */
const handleClearButtons = (list: List) => {
  return addListener(window, 'click', (e) => {
    const { target } = e;

    if (!(target instanceof Element)) return;

    const { instance, filters } = list;

    const clearElementSelector = getElementSelector('clear', { instance });
    const clearElement = target?.closest(clearElementSelector);
    if (!clearElement) return;

    // Remove all groups and conditions except the first one
    filters.value.groups.splice(1);

    const firstGroup = filters.value.groups[0];
    if (!firstGroup) return;

    firstGroup.conditions.splice(1);

    const firstCondition = firstGroup.conditions[0];
    if (!firstCondition) return;

    firstCondition.value = Array.isArray(firstCondition.value) ? [] : '';
  });
};
