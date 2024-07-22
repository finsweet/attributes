import {
  addListener,
  cloneNode,
  createRenderController,
  type FormField,
  simulateEvent,
} from '@finsweet/attributes-utils';
import { atom, computed, type ReadableAtom, type WritableAtom } from 'nanostores';

import type { List } from '../components/List';
import type { ListItem } from '../components/ListItem';
import { queryAllElements, queryElement } from '../utils/selectors';
import type { FilterMatch, FilterOperator } from './types';

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

  const conditionGroups = atom<HTMLElement[]>([]);

  const cleanups = new Set<() => void>();

  // Handle condition groups matching
  const conditionGroupMatch = queryElement<HTMLSelectElement>('condition-group-match', { scope: form });
  if (conditionGroupMatch) {
    const renderController = createRenderController(conditionGroupMatch);

    const renderCleanup = conditionGroups.subscribe(($conditionGroups) => {
      const shouldRender = $conditionGroups.length > 1;

      renderController.update(shouldRender);
    });

    const inputCleanup = addListener(conditionGroupMatch, 'input', () => {
      const match = conditionGroupMatch.value as FilterMatch;

      list.filters.setKey('match', match);
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

      const $conditionGroups = conditionGroups.get();
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

  // Construct destroy
  const destroy = () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();

    conditionGroup.remove();

    conditionGroups.set(conditionGroups.get().filter(($conditionGroup) => $conditionGroup !== conditionGroup));
  };

  return destroy;
};

const initConditionGroup = (list: List, conditionGroup: HTMLElement, conditionGroups: WritableAtom<HTMLElement[]>) => {
  const condition = queryElement('condition', { scope: conditionGroup });
  if (!condition) return;

  const conditionTemplate = cloneNode(condition);

  const groupConditions = atom<HTMLElement[]>([]);

  // Store the condition group
  conditionGroups.set([...conditionGroups.get(), conditionGroup]);

  // Compute the condition group index
  const conditionGroupIndex = computed(conditionGroups, ($conditionGroups) => $conditionGroups.indexOf(conditionGroup));

  const conditionGroupPath = computed(
    [conditionGroupIndex],
    ($conditionGroupIndex) => `groups[${$conditionGroupIndex}]` as const
  );

  // Store cleanups
  const cleanups = new Set<() => void>();

  // Handle condition matching
  const conditionMatch = queryElement<HTMLSelectElement>('condition-match', { scope: conditionGroup });
  if (conditionMatch) {
    const renderController = createRenderController(conditionMatch);

    const renderCleanup = groupConditions.subscribe(($groupConditions) => {
      const shouldRender = $groupConditions.length > 1;

      renderController.update(shouldRender);
    });

    const inputCleanup = addListener(conditionMatch, 'input', () => {
      const match = conditionMatch.value as FilterMatch;

      list.filters.setKey(`${conditionGroupPath.get()}.match`, match);
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

      const $groupConditions = groupConditions.get();
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
      if (conditionGroups.get().length <= 1) return;

      destroy();
    });

    // Handle remove button display
    const renderController = createRenderController(conditionGroupRemove);

    const renderCleanup = conditionGroups.subscribe(($conditionGroups) => {
      const shouldRender = $conditionGroups.length > 1;

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

    conditionGroups.set(conditionGroups.get().filter(($conditionGroup) => $conditionGroup !== conditionGroup));
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
  groupConditions: WritableAtom<HTMLElement[]>,
  conditionGroupPath: ReadableAtom<`groups[${number}]`>
) => {
  const conditionField = queryElement<HTMLSelectElement>('condition-field', { scope: condition });
  if (!(conditionField instanceof HTMLSelectElement)) return;

  const conditionOperator = queryElement<FormField>('condition-operator', { scope: condition });
  if (!conditionOperator) return;

  const conditionValue = queryElement<FormField>('condition-value', { scope: condition });
  if (!conditionValue) return;

  // Store the condition
  groupConditions.set([...groupConditions.get(), condition]);

  // Compute the condition index
  const conditionIndex = computed(groupConditions, ($groupConditions) => $groupConditions.indexOf(condition));

  const conditionPath = computed(
    [conditionGroupPath, conditionIndex],
    ($conditionGroupPath, $conditionIndex) => `${$conditionGroupPath}.conditions[${$conditionIndex}]` as const
  );

  // Store cleanups
  const cleanups = new Set<() => void>();

  // Bind condition values
  const fieldInputCleanup = addListener(conditionField, 'input', () => {
    const field = conditionField.value;

    list.filters.setKey(`${conditionPath.get()}.field`, field);
  });

  const operatorInputCleanup = addListener(conditionOperator, 'input', () => {
    const op = conditionOperator.value as FilterOperator;

    list.filters.setKey(`${conditionPath.get()}.op`, op);
  });

  const valueInputCleanup = addListener(conditionValue, 'input', () => {
    const value = getConditionValue(conditionValue);

    list.filters.setKey(`${conditionPath.get()}.value`, value);
  });

  cleanups.add(fieldInputCleanup);
  cleanups.add(operatorInputCleanup);
  cleanups.add(valueInputCleanup);

  // Populate condition field options
  const itemsCleanup = list.items.subscribe((items) => {
    populateConditionField(items, conditionField);
  });

  cleanups.add(itemsCleanup);

  // Handle remove button
  const conditionRemove = queryElement('condition-remove', { scope: condition });
  if (conditionRemove) {
    // Handle remove button display
    const displayCleanup = groupConditions.subscribe(($groupConditions) => {
      conditionRemove.style.display = $groupConditions.length > 1 ? '' : 'none';
    });

    // Handle removing the condition
    const clickCleanup = addListener(conditionRemove, 'click', () => {
      if (groupConditions.get().length <= 1) return;

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

    groupConditions.set(groupConditions.get().filter(($conditionWrapper) => $conditionWrapper !== condition));
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
