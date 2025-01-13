import { addListener, cloneNode, type FormField, RenderController, simulateEvent } from '@finsweet/attributes-utils';
import { computed, effect, type Ref, ref, watch } from '@vue/reactivity';
import { dset } from 'dset';

import type { List } from '../components/List';
import type { ListItem } from '../components/ListItem';
import { setReactive } from '../utils/reactivity';
import { queryAllElements, queryElement } from '../utils/selectors';
import type { FilterMatch, FilterOperator } from './types';

declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    htmlElements: HTMLElement;
  }
}

/**
 * Inits advanced filters for a list.
 * @param list
 * @param form
 * @returns A cleanup function
 */
export const initAdvancedFilters = (list: List, form: HTMLFormElement) => {
  const conditionGroup = queryElement('condition-group', { scope: form });
  if (!conditionGroup) return;

  const conditionGroupsWrapper = conditionGroup.parentElement;
  if (!conditionGroupsWrapper) return;

  const conditionGroupTemplate = cloneNode(conditionGroup);

  const conditionGroups = ref<HTMLElement[]>([]);

  const cleanups = new Set<() => void>();

  // Handle condition groups matching
  const conditionGroupMatch = queryElement<HTMLSelectElement>('condition-group-match', { scope: form });
  if (conditionGroupMatch) {
    const renderController = new RenderController(conditionGroupMatch);

    const renderCleanup = effect(() => {
      const shouldRender = conditionGroups.value.length > 1;

      renderController.update(shouldRender);
    });

    const inputCleanup = addListener(conditionGroupMatch, 'input', () => {
      list.filters.match = conditionGroupMatch.value as FilterMatch;
    });

    cleanups.add(renderCleanup);
    cleanups.add(renderController.destroy);
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
  const filters = getAdvancedFilters(form);
  setReactive(list.filters, filters);

  // Get filters on node changes
  const mutationObserver = new MutationObserver(() => {
    const filters = getAdvancedFilters(form);
    setReactive(list.filters, filters);
  });

  mutationObserver.observe(form, {
    childList: true,
    subtree: true,
  });

  // Construct destroy
  const destroy = () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
    conditionGroup.remove();
    mutationObserver.disconnect();

    conditionGroups.value = conditionGroups.value.filter(($conditionGroup) => $conditionGroup !== conditionGroup);
  };

  return destroy;
};

const initConditionGroup = (list: List, conditionGroup: HTMLElement, conditionGroups: Ref<HTMLElement[]>) => {
  const condition = queryElement('condition', { scope: conditionGroup });
  if (!condition) return;

  const conditionTemplate = cloneNode(condition);

  const groupConditions = ref<HTMLElement[]>([]);

  // Store the condition group
  conditionGroups.value = [...conditionGroups.value, conditionGroup];

  // Compute the condition group index
  const conditionGroupIndex = computed(() => conditionGroups.value.indexOf(conditionGroup));

  const conditionGroupPath = computed(() => `groups.${conditionGroupIndex.value}`);

  // Store cleanups
  const cleanups = new Set<() => void>();

  // Handle condition matching
  const conditionMatch = queryElement<HTMLSelectElement>('condition-match', { scope: conditionGroup });
  if (conditionMatch) {
    const renderController = new RenderController(conditionMatch);

    const renderCleanup = effect(() => {
      const shouldRender = groupConditions.value.length > 1;

      renderController.update(shouldRender);
    });

    const inputCleanup = addListener(conditionMatch, 'input', () => {
      const match = conditionMatch.value as FilterMatch;

      dset(list.filters, conditionGroupPath.value, { match, conditions: [] });
    });

    cleanups.add(renderCleanup);
    cleanups.add(renderController.destroy);
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
    const renderController = new RenderController(conditionGroupRemove);

    const renderCleanup = effect(() => {
      const shouldRender = conditionGroups.value.length > 1;

      renderController.update(shouldRender);
    });

    cleanups.add(clickCleanup);
    cleanups.add(renderCleanup);
    cleanups.add(renderController.destroy);
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
  groupConditions: Ref<HTMLElement[]>,
  conditionGroupPath: Ref<string>
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
  const fieldInputCleanup = addListener(conditionField, 'input', () => {
    const field = conditionField.value;

    dset(list.filters, `${conditionPath.value}.field`, field);
  });

  const operatorInputCleanup = addListener(conditionOperator, 'input', () => {
    const op = conditionOperator.value as FilterOperator;

    dset(list.filters, `${conditionPath.value}.op`, op);
  });

  const valueInputCleanup = addListener(conditionValue, 'input', () => {
    const value = getConditionValue(conditionValue);

    dset(list.filters, `${conditionPath.value}.value`, value);
  });

  cleanups.add(fieldInputCleanup);
  cleanups.add(operatorInputCleanup);
  cleanups.add(valueInputCleanup);

  // Populate condition field options
  const itemsCleanup = watch(list.items, (items) => populateConditionField(items, conditionField), { immediate: true });

  cleanups.add(itemsCleanup);

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
 * Populates a condition field dropdown with the fields from the list items
 * @param items
 * @param conditionField
 */
const populateConditionField = (items: readonly ListItem[], conditionField: HTMLSelectElement) => {
  // Collect fields
  const fields = items.reduce((acc, curr) => {
    for (const key in curr.fields) {
      acc.add(key);
    }

    return acc;
  }, new Set<string>());

  // Clear options
  for (const option of conditionField.options) {
    if (option.value) {
      option.remove();
    }
  }

  // Populate options
  for (const field of fields) {
    const option = document.createElement('option');

    option.value = field;
    option.textContent = field;

    conditionField.appendChild(option);
  }

  // Simulate input event
  queueMicrotask(() => {
    simulateEvent(conditionField, 'input');
  });
};

/**
 * @returns The value of a given form field.
 * @param conditionValue
 */
const getConditionValue = (conditionValue?: FormField | null) => {
  if (!conditionValue) return;

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
  const match = conditionGroupMatch?.value as FilterMatch | undefined;

  const conditionGroups = queryAllElements('condition-group', { scope: form });
  const groups = conditionGroups.map((conditionGroup) => {
    const conditionMatch = queryElement<HTMLSelectElement>('condition-match', { scope: conditionGroup });
    const match = conditionMatch?.value as FilterMatch | undefined;

    const conditions = queryAllElements('condition', { scope: conditionGroup }).map((condition) => {
      const conditionField = queryElement<HTMLSelectElement>('condition-field', { scope: condition });
      const field = conditionField?.value;

      const conditionOperator = queryElement<HTMLSelectElement>('condition-operator', { scope: condition });
      const op = conditionOperator?.value as FilterOperator;

      const conditionValue = queryElement<FormField>('condition-value', { scope: condition });
      const value = getConditionValue(conditionValue);

      return { field, op, value };
    });

    return { match, conditions };
  });

  return { match, groups };
};
