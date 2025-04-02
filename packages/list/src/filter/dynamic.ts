import { addListener, cloneNode, type FormField, Renderer } from '@finsweet/attributes-utils';
import { computed, effect, shallowRef, type ComputedRef, type ShallowRef } from '@vue/reactivity';
import { dset } from 'dset';

import type { List } from '../components/List';
import { queryAllElements, queryElement } from '../utils/selectors';
import type { FilterMatch, FilterOperator, Filters, FiltersCondition, FiltersGroup } from './types';

declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    htmlElements: HTMLElement;
  }
}

/**
 * Inits dynamic filters for a list.
 * @param list
 * @param form
 * @returns A cleanup function
 */
export const initDynamicFilters = (list: List, form: HTMLFormElement) => {
  const conditionGroup = queryElement('condition-group', { scope: form });
  if (!conditionGroup) return;

  const conditionGroupsWrapper = conditionGroup.parentElement;
  if (!conditionGroupsWrapper) return;

  const conditionGroupTemplate = cloneNode(conditionGroup);

  const conditionGroups = shallowRef<HTMLElement[]>([]);

  const cleanups = new Set<() => void>();

  // Handle condition groups matching
  const conditionGroupMatch = queryElement<HTMLSelectElement>('condition-group-match', { scope: form });
  if (conditionGroupMatch) {
    const conditionGroupMatchRenderer = new Renderer(conditionGroupMatch);

    const conditionGroupMatchRenderCleanup = effect(() => {
      const shouldRender = conditionGroups.value.length > 1;

      conditionGroupMatchRenderer.update(shouldRender);
    });

    // TODO: support fs-list-filteron
    const inputCleanup = addListener(conditionGroupMatch, 'change', () => {
      list.filters.value.groupsMatch = conditionGroupMatch.value as FilterMatch;
    });

    cleanups.add(conditionGroupMatchRenderCleanup);
    cleanups.add(conditionGroupMatchRenderer.destroy);
    cleanups.add(inputCleanup);
  }

  // Handle adding condition groups
  const conditionGroupAdd = queryElement('condition-group-add', { scope: form });
  if (conditionGroupAdd) {
    const clickCleanup = addListener(conditionGroupAdd, 'click', () => {
      const conditionGroupClone = cloneNode(conditionGroupTemplate);

      const groupCleanup = initConditionGroup(list, conditionGroupClone, conditionGroups);
      if (!groupCleanup) return;

      cleanups.add(groupCleanup);

      const $conditionGroups = conditionGroups.value;
      const previousConditionGroup = $conditionGroups[$conditionGroups.length - 2];

      if (previousConditionGroup) {
        previousConditionGroup.after(conditionGroupClone);
      } else {
        conditionGroupsWrapper.append(conditionGroupClone);
      }
    });

    cleanups.add(clickCleanup);
  }

  // Init default condition group
  const groupCleanup = initConditionGroup(list, conditionGroup, conditionGroups);
  if (groupCleanup) {
    cleanups.add(groupCleanup);
  }

  // Get initial filters
  list.filters.value = getAdvancedFilters(form);

  // Get filters on node changes
  // TODO: Prevent conditions addition/removal to trigger the mutation observer
  // const mutationObserver = new MutationObserver(() => {
  //   list.filters.value = getAdvancedFilters(form);
  // });

  // mutationObserver.observe(form, {
  //   childList: true,
  //   subtree: true,
  // });

  // Construct destroy
  const destroy = () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
    conditionGroup.remove();
    // mutationObserver.disconnect();

    conditionGroups.value = conditionGroups.value.filter(($conditionGroup) => $conditionGroup !== conditionGroup);
  };

  return destroy;
};

const initConditionGroup = (list: List, conditionGroup: HTMLElement, conditionGroups: ShallowRef<HTMLElement[]>) => {
  const condition = queryElement('condition', { scope: conditionGroup });
  if (!condition) return;

  const conditionTemplate = cloneNode(condition);

  const groupConditions = shallowRef<HTMLElement[]>([]);

  // Store the condition group
  conditionGroups.value = [...conditionGroups.value, conditionGroup];

  // Compute the condition group index
  const conditionGroupIndex = computed(() => conditionGroups.value.indexOf(conditionGroup));

  const conditionGroupPath = computed(() => `groups.${conditionGroupIndex.value}`);

  // Add the condition group to the filters
  dset(list.filters.value, conditionGroupPath.value, {
    conditionsMatch: 'and',
    conditions: [],
  } satisfies FiltersGroup);

  // Store cleanups
  const cleanups = new Set<() => void>();

  // Handle condition matching
  const conditionMatch = queryElement<HTMLSelectElement>('condition-match', { scope: conditionGroup });
  if (conditionMatch) {
    const conditionMatchRenderer = new Renderer(conditionMatch);

    const conditionMatchRenderCleanup = effect(() => {
      const shouldRender = groupConditions.value.length > 1;

      conditionMatchRenderer.update(shouldRender);
    });

    const inputCleanup = addListener(conditionMatch, 'change', () => {
      const conditionsMatch = conditionMatch.value as FilterMatch;

      dset(list.filters.value, `${conditionGroupPath.value}.conditionsMatch`, conditionsMatch);
    });

    cleanups.add(conditionMatchRenderCleanup);
    cleanups.add(conditionMatchRenderer.destroy);
    cleanups.add(inputCleanup);
  }

  // Handle adding conditions to the group
  const conditionAdd = queryElement('condition-add', { scope: conditionGroup });
  if (conditionAdd) {
    const clickCleanup = addListener(conditionAdd, 'click', () => {
      const conditionClone = cloneNode(conditionTemplate);

      const conditionCleanup = initCondition(list, conditionClone, groupConditions, conditionGroupPath);
      if (!conditionCleanup) return;

      cleanups.add(conditionCleanup);

      const $groupConditions = groupConditions.value;
      const previousCondition = $groupConditions[$groupConditions.length - 2];

      if (previousCondition) {
        previousCondition.after(conditionClone);
      } else {
        conditionGroup.append(conditionClone);
      }
    });

    cleanups.add(clickCleanup);
  }

  // Handle removing the group
  const conditionGroupRemove = queryElement('condition-group-remove', { scope: conditionGroup });
  if (conditionGroupRemove) {
    // Handle remove button click
    const clickCleanup = addListener(conditionGroupRemove, 'click', () => {
      if (conditionGroups.value.length <= 1) return;

      destroy();
    });

    // Handle remove button display
    const conditionGroupRemoveRenderer = new Renderer(conditionGroupRemove);

    const conditionGroupRemoveRenderCleanup = effect(() => {
      const shouldRender = conditionGroups.value.length > 1;

      conditionGroupRemoveRenderer.update(shouldRender);
    });

    cleanups.add(clickCleanup);
    cleanups.add(conditionGroupRemoveRenderCleanup);
    cleanups.add(conditionGroupRemoveRenderer.destroy);
  }

  // Init default condition
  const conditionCleanup = initCondition(list, condition, groupConditions, conditionGroupPath);
  if (conditionCleanup) {
    cleanups.add(conditionCleanup);
  }

  // Construct destroy
  const destroy = () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();

    conditionGroup.remove();

    conditionGroups.value = conditionGroups.value.filter(($conditionGroup) => $conditionGroup !== conditionGroup);
  };

  return destroy;
};

/**
 * Inits a condition
 * @param list
 * @param condition
 * @param groupConditions
 * @returns A cleanup function
 */
const initCondition = (
  list: List,
  condition: HTMLElement,
  groupConditions: ShallowRef<HTMLElement[]>,
  conditionGroupPath: ComputedRef<string>
) => {
  const conditionField = queryElement<HTMLSelectElement>('condition-field', { scope: condition });
  if (!(conditionField instanceof HTMLSelectElement)) return;

  const conditionOperator = queryElement<FormField>('condition-operator', { scope: condition });
  if (!conditionOperator) return;

  const conditionValue = queryElement<FormField>('condition-value', { scope: condition });
  if (!conditionValue) return;

  // Store the condition
  groupConditions.value = [...groupConditions.value, condition];

  // Compute the condition index
  const conditionIndex = computed(() => groupConditions.value.indexOf(condition));
  const conditionPath = computed(() => `${conditionGroupPath.value}.conditions.${conditionIndex.value}`);

  // Store cleanups
  const cleanups = new Set<() => void>();

  // Bind condition values
  const changeCleanup = addListener(condition, 'change', () => {
    const fieldKey = conditionField.value;
    const op = conditionOperator.value as FilterOperator;
    const value = getConditionValue(conditionValue);

    if (!fieldKey || !op) return;

    // TODO: merge values instead of overriding
    dset(list.filters.value, conditionPath.value, {
      fieldKey,
      op,
      value,
      fieldMatch: 'or', // TODO
      filterMatch: 'or', // TODO
      type: 'select-one', // TODO
    } satisfies FiltersCondition);
  });

  cleanups.add(changeCleanup);

  // Handle remove button
  const conditionRemove = queryElement('condition-remove', { scope: condition });
  if (conditionRemove) {
    // Handle remove button display
    const displayCleanup = effect(() => {
      conditionRemove.style.display = groupConditions.value.length > 1 ? '' : 'none';
    });

    // Handle removing the condition
    const clickCleanup = addListener(conditionRemove, 'click', () => {
      if (groupConditions.value.length <= 1) return;

      destroy();
    });

    cleanups.add(displayCleanup);
    cleanups.add(clickCleanup);
  }

  // Construct destroy
  const destroy = () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();

    condition.remove();

    groupConditions.value = groupConditions.value.filter(($conditionWrapper) => $conditionWrapper !== condition);
  };

  return destroy;
};

/**
 * @returns The value of a given form field.
 * @param conditionValue
 */
const getConditionValue = (conditionValue?: FormField | null) => {
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
export const getAdvancedFilters = (form: HTMLFormElement) => {
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
