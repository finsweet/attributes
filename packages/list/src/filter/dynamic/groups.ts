import { addListener, cloneNode } from '@finsweet/attributes-utils';
import { computed, type ComputedRef, effect, type ShallowRef, shallowRef, watch } from '@vue/reactivity';

import type { List } from '../../components';
import { getAttribute, queryElement } from '../../utils/selectors';
import type { FilterMatch } from '../types';
import { type Condition, initCondition, initConditionAdd, initConditionsMatch } from './conditions';
import { getFilterMatchValue } from './utils';

export type ConditionGroup = {
  id: string;
  element: HTMLElement;
  conditions: ShallowRef<Condition[]>;
  cleanup: () => void;
};

/**
 * Inits the condition groups match for a dynamic filters setup.
 * @param list
 * @param element
 * @param conditionGroups
 * @returns A cleanup function
 */
export const initConditionGroupsMatch = (
  list: List,
  element: HTMLSelectElement,
  conditionGroups: ShallowRef<ConditionGroup[]>
) => {
  // TODO: support fs-list-filteron
  const inputCleanup = addListener(element, 'change', () => {
    list.filters.value.groupsMatch = getFilterMatchValue(element);
  });

  const disabledClass = getAttribute(element, 'dynamicdisabledclass');

  const runner = effect(() => {
    const disabled = conditionGroups.value.length <= 1;

    element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    element.classList.toggle(disabledClass, disabled);
  });

  return () => {
    inputCleanup();
    runner.effect.stop();
  };
};

/**
 * Inits the button to add a new condition group.
 * @param list
 * @param element
 * @param conditionGroupTemplate
 * @param conditionGroupsWrapper
 * @param conditionGroups
 * @returns A cleanup function
 */
export const initConditionGroupsAdd = (
  list: List,
  element: HTMLElement,
  conditionGroupTemplate: HTMLElement,
  conditionGroupsWrapper: HTMLElement,
  conditionGroups: ShallowRef<ConditionGroup[]>
) => {
  const clickCleanup = addListener(element, 'click', () => {
    const clone = cloneNode(conditionGroupTemplate);

    const conditionGroup = initConditionGroup(list, clone, conditionGroups);
    if (!conditionGroup) return;

    const previousConditionGroup = conditionGroups.value[conditionGroups.value.length - 2];

    if (previousConditionGroup) {
      previousConditionGroup.element.after(conditionGroup.element);
    } else {
      conditionGroupsWrapper.append(conditionGroup.element);
    }
  });

  return clickCleanup;
};

/**
 * Inits the button to remove a condition group.
 * @param element
 * @param conditionGroup
 * @param conditionGroups
 * @returns A cleanup function
 */
const initConditionGroupRemove = (
  element: HTMLElement,
  conditionGroup: ConditionGroup,
  conditionGroups: ShallowRef<ConditionGroup[]>
) => {
  const clickCleanup = addListener(element, 'click', () => {
    if (conditionGroups.value.length <= 1) return;

    conditionGroup.cleanup();
  });

  const disabledClass = getAttribute(element, 'dynamicdisabledclass');

  const runner = effect(() => {
    const disabled = conditionGroups.value.length <= 1;

    element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    element.classList.toggle(disabledClass, disabled);
  });

  return () => {
    clickCleanup();
    runner.effect.stop();
  };
};

/**
 * @returns The condition group with the given ID, or undefined if not found.
 * @param list
 * @param conditionGroup
 */
export const getFiltersGroup = (list: List, conditionGroup: ConditionGroup) => {
  return list.filters.value.groups.find((group) => group.id === conditionGroup.id);
};

/**
 * Inits a condition group for a dynamic filters setup.
 * @param list
 * @param element
 * @param conditionGroups
 * @returns The condition group instance
 */
export const initConditionGroup = (
  list: List,
  element: HTMLElement,
  conditionGroups: ShallowRef<ConditionGroup[]>
): ConditionGroup | undefined => {
  const conditionElement = queryElement('condition', { scope: element });
  if (!conditionElement) return;

  const conditionTemplate = cloneNode(conditionElement);

  // Store the condition group
  const id = crypto.randomUUID();
  const cleanups = new Set<() => void>();

  const conditionGroup: ConditionGroup = {
    id,
    element,
    conditions: shallowRef<Condition[]>([]),

    cleanup: () => {
      for (const condition of conditionGroup.conditions.value) {
        condition.cleanup();
      }

      for (const cleanup of cleanups) {
        cleanup();
      }

      cleanups.clear();
      element.remove();

      conditionGroups.value = conditionGroups.value.filter((group) => group.id !== id);

      const conditionGroupIndex = list.filters.value.groups.findIndex((group) => group.id === id);
      if (conditionGroupIndex === -1) return;

      list.filters.value.groups.splice(conditionGroupIndex, 1);
    },
  };

  // Handle condition matching
  let conditionsMatch: FilterMatch = 'and';

  const conditionsMatchSelect = queryElement<HTMLSelectElement>('condition-match', { scope: element });
  if (conditionsMatchSelect) {
    conditionsMatch = getFilterMatchValue(conditionsMatchSelect);

    const cleanup = initConditionsMatch(list, conditionsMatchSelect, conditionGroup);
    cleanups.add(cleanup);
  }

  // Store the group
  conditionGroups.value = [...conditionGroups.value, conditionGroup];

  list.filters.value.groups.push({
    id,
    conditionsMatch,
    conditions: [],
  });

  // Handle adding conditions to the group
  const conditionAddButton = queryElement('condition-add', { scope: element });
  if (conditionAddButton) {
    const cleanup = initConditionAdd(list, conditionAddButton, conditionTemplate, conditionGroup);
    cleanups.add(cleanup);
  }

  // Handle removing the group
  const conditionGroupRemoveButton = queryElement('condition-group-remove', { scope: element });
  if (conditionGroupRemoveButton) {
    const cleanup = initConditionGroupRemove(conditionGroupRemoveButton, conditionGroup, conditionGroups);
    cleanups.add(cleanup);
  }

  // Init default condition
  initCondition(list, conditionElement, conditionGroup);

  const autoCleanup = watch(
    () => getFiltersGroup(list, conditionGroup),
    (filtersGroup) => {
      if (!filtersGroup) {
        conditionGroup.cleanup();
      }
    }
  );

  cleanups.add(autoCleanup);

  return conditionGroup;
};
