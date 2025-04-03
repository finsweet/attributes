import { addListener, cloneNode, Renderer } from '@finsweet/attributes-utils';
import { computed, type ComputedRef, effect, type ShallowRef, shallowRef } from '@vue/reactivity';
import { dset } from 'dset';

import type { List } from '../../components';
import { queryElement } from '../../utils/selectors';
import type { AllFieldsData, FilterMatch, FiltersGroup } from '../types';
import { type Condition, initCondition, initConditionAdd, initConditionsMatch } from './conditions';
import { getFilterMatchValue } from './utils';

export type ConditionGroup = {
  element: HTMLElement;
  index: ComputedRef<number>;
  path: ComputedRef<string>;
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

  const renderer = new Renderer(element);

  const renderRunner = effect(() => {
    const shouldRender = conditionGroups.value.length > 1;

    renderer.update(shouldRender);
  });

  return () => {
    inputCleanup();
    renderRunner.effect.stop();
    renderer.destroy();
  };
};

/**
 * Inits the button to add a new condition group.
 * @param list
 * @param element
 * @param conditionGroupTemplate
 * @param conditionGroupsWrapper
 * @param conditionGroups
 * @param allFieldsData
 * @returns A cleanup function
 */
export const initConditionGroupsAdd = (
  list: List,
  element: HTMLElement,
  conditionGroupTemplate: HTMLElement,
  conditionGroupsWrapper: HTMLElement,
  conditionGroups: ShallowRef<ConditionGroup[]>,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  const clickCleanup = addListener(element, 'click', () => {
    const clone = cloneNode(conditionGroupTemplate);

    const conditionGroup = initConditionGroup(list, clone, conditionGroups, allFieldsData);
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

  const renderer = new Renderer(element);

  const renderRunner = effect(() => {
    const shouldRender = conditionGroups.value.length > 1;

    renderer.update(shouldRender);
  });

  return () => {
    clickCleanup();
    renderRunner.effect.stop();
    renderer.destroy();
  };
};

/**
 * Inits a condition group for a dynamic filters setup.
 * @param list
 * @param element
 * @param conditionGroups
 * @param allFieldsData
 * @returns The condition group instance
 */
export const initConditionGroup = (
  list: List,
  element: HTMLElement,
  conditionGroups: ShallowRef<ConditionGroup[]>,
  allFieldsData: ComputedRef<AllFieldsData>
): ConditionGroup | undefined => {
  const conditionElement = queryElement('condition', { scope: element });
  if (!conditionElement) return;

  const conditionTemplate = cloneNode(conditionElement);

  // Store the condition group
  const cleanups = new Set<() => void>();
  const conditionGroup: ConditionGroup = {
    element,
    conditions: shallowRef<Condition[]>([]),
    index: computed(() => conditionGroups.value.indexOf(conditionGroup)),
    path: computed(() => `groups.${conditionGroup.index.value}`),

    cleanup: () => {
      for (const condition of conditionGroup.conditions.value) {
        condition.cleanup();
      }

      for (const cleanup of cleanups) {
        cleanup();
      }

      cleanups.clear();
      element.remove();

      const $conditionIndex = conditionGroup.index.value;

      list.filters.value.groups.splice($conditionIndex, 1);
      conditionGroups.value.splice($conditionIndex, 1);
      conditionGroups.value = [...conditionGroups.value];
    },
  };

  conditionGroups.value = [...conditionGroups.value, conditionGroup];

  // Handle condition matching
  let conditionsMatch: FilterMatch = 'and';

  const conditionsMatchSelect = queryElement<HTMLSelectElement>('condition-match', { scope: element });
  if (conditionsMatchSelect) {
    conditionsMatch = getFilterMatchValue(conditionsMatchSelect);

    const cleanup = initConditionsMatch(list, conditionsMatchSelect, conditionGroup);
    cleanups.add(cleanup);
  }

  // Handle adding conditions to the group
  const conditionAddButton = queryElement('condition-add', { scope: element });
  if (conditionAddButton) {
    const cleanup = initConditionAdd(list, conditionAddButton, conditionTemplate, conditionGroup, allFieldsData);
    cleanups.add(cleanup);
  }

  // Handle removing the group
  const conditionGroupRemoveButton = queryElement('condition-group-remove', { scope: element });
  if (conditionGroupRemoveButton) {
    const cleanup = initConditionGroupRemove(conditionGroupRemoveButton, conditionGroup, conditionGroups);
    cleanups.add(cleanup);
  }

  // Add the condition group to the filters
  dset(list.filters.value, conditionGroup.path.value, {
    conditionsMatch,
    conditions: [],
  } satisfies FiltersGroup);

  // Init default condition
  initCondition(list, conditionElement, conditionGroup, allFieldsData);

  return conditionGroup;
};
