import {
  addListener,
  cloneNode,
  type FormField,
  type FormFieldType,
  isFormField,
  isHTMLSelectElement,
  Renderer,
} from '@finsweet/attributes-utils';
import { computed, type ComputedRef, effect } from '@vue/reactivity';
import { dset } from 'dset';

import type { List } from '../../components';
import { SETTINGS } from '../../utils/constants';
import { getAttribute, queryElement } from '../../utils/selectors';
import type { FilterOperator, FiltersCondition } from '../types';
import type { ConditionGroup } from './groups';
import { getFilterMatchValue } from './utils';

export type Condition = {
  element: HTMLElement;
  index: ComputedRef<number>;
  path: ComputedRef<string>;
  cleanup: () => void;
};

/**
 * Inits the conditions matching selector for a dynamic filters setup.
 * @param list
 * @param element
 * @param conditionGroup
 */
export const initConditionsMatch = (list: List, element: HTMLSelectElement, conditionGroup: ConditionGroup) => {
  // TODO: support fs-list-filteron
  const inputCleanup = addListener(element, 'change', () => {
    const conditionsMatch = getFilterMatchValue(element);

    dset(list.filters.value, `${conditionGroup.path.value}.conditionsMatch`, conditionsMatch);
  });

  const renderer = new Renderer(element);

  const renderRunner = effect(() => {
    const shouldRender = conditionGroup.conditions.value.length > 1;

    renderer.update(shouldRender);
  });

  return () => {
    inputCleanup();
    renderRunner.effect.stop();
    renderer.destroy();
  };
};

/**
 * Inits the condition add button of a condition group.
 * @param list
 * @param element
 * @param conditionTemplate
 * @param conditionGroup
 * @returns A cleanup function
 */
export const initConditionAdd = (
  list: List,
  element: HTMLElement,
  conditionTemplate: HTMLElement,
  conditionGroup: ConditionGroup
) => {
  const cleanup = addListener(element, 'click', () => {
    const conditionClone = cloneNode(conditionTemplate);

    const condition = initCondition(list, conditionClone, conditionGroup);
    if (!condition) return;

    const $conditions = conditionGroup.conditions.value;
    const previousCondition = $conditions[$conditions.length - 2];

    if (previousCondition) {
      previousCondition.element.after(condition.element);
    } else {
      conditionGroup.element.append(condition.element);
    }
  });

  return cleanup;
};

/**
 * Inits the condition remove button of a condition.
 * @param element
 * @param condition
 * @param conditionGroup
 * @returns A cleanup function
 */
const initConditionRemove = (element: HTMLElement, condition: Condition, conditionGroup: ConditionGroup) => {
  const clickCleanup = addListener(element, 'click', () => {
    if (conditionGroup.conditions.value.length <= 1) return;

    condition.cleanup();
  });

  const renderer = new Renderer(element);

  const renderRunner = effect(() => {
    const shouldRender = conditionGroup.conditions.value.length > 1;

    renderer.update(shouldRender);
  });

  return () => {
    clickCleanup();
    renderRunner.effect.stop();
    renderer.destroy();
  };
};

/**
 * Retrieves a condition's data.
 * @param conditionFieldSelect
 * @param conditionOperatorSelect
 * @param conditionValueField
 */
const getConditionData = (
  conditionFieldSelect: HTMLSelectElement,
  conditionOperatorSelect: HTMLSelectElement,
  conditionValueField: FormField
): FiltersCondition | undefined => {
  const type = conditionValueField.type as FormFieldType;
  const rawOp = conditionOperatorSelect.value as FilterOperator;

  const fieldKey = conditionFieldSelect.value;
  if (!fieldKey) return;

  const op = SETTINGS.operator.values.includes(rawOp) ? rawOp : null;
  if (!op) return;

  const fuzzyThreshold = getAttribute(conditionValueField, 'fuzzy');

  let value: string | string[];

  switch (type) {
    // Select multiple
    case 'select-multiple': {
      value = [...(conditionValueField as HTMLSelectElement).selectedOptions].map((option) => option.value);
    }

    // Dates
    case 'date':
    case 'month':
    case 'week':
    case 'time': {
      const { valueAsDate, value: _value } = conditionValueField as HTMLInputElement;
      value = valueAsDate ? valueAsDate.toISOString() : _value;
    }

    // Default - Text
    default: {
      value = conditionValueField.value;
    }
  }

  return {
    type,
    fieldKey,
    op,
    value,
    fuzzyThreshold,
    fieldMatch: 'or', // TODO
    filterMatch: 'or', // TODO
  };
};

/**
 * Inits a condition
 * @param list
 * @param element
 * @param conditionGroup
 * @returns A cleanup function
 */
export const initCondition = (list: List, element: HTMLElement, conditionGroup: ConditionGroup) => {
  const conditionFieldSelect = queryElement('condition-field', { scope: element });
  if (!isHTMLSelectElement(conditionFieldSelect)) return;

  const conditionOperatorSelect = queryElement('condition-operator', { scope: element });
  if (!isHTMLSelectElement(conditionOperatorSelect)) return;

  const conditionValueField = queryElement('condition-value', { scope: element });
  if (!isFormField(conditionValueField)) return;

  // Store the condition
  const cleanups = new Set<() => void>();
  const condition: Condition = {
    element,
    index: computed(() => conditionGroup.conditions.value.indexOf(condition)),
    path: computed(() => `${conditionGroup.path.value}.conditions.${condition.index.value}`),

    cleanup: () => {
      for (const cleanup of cleanups) {
        cleanup();
      }

      cleanups.clear();
      element.remove();

      const $groupIndex = conditionGroup.index.value;
      const $conditionIndex = condition.index.value;

      list.filters.value.groups[$groupIndex].conditions.splice($conditionIndex, 1);

      conditionGroup.conditions.value.splice($conditionIndex, 1);
      conditionGroup.conditions.value = [...conditionGroup.conditions.value];
    },
  };

  conditionGroup.conditions.value = [...conditionGroup.conditions.value, condition];

  // Handle remove button
  const conditionRemoveButton = queryElement('condition-remove', { scope: element });
  if (conditionRemoveButton) {
    const cleanup = initConditionRemove(conditionRemoveButton, condition, conditionGroup);
    cleanups.add(cleanup);
  }

  // Bind condition values
  const changeCleanup = addListener(element, 'change', () => {
    const conditionData = getConditionData(conditionFieldSelect, conditionOperatorSelect, conditionValueField);
    if (!conditionData) return;

    dset(list.filters.value, condition.path.value, conditionData);
  });

  cleanups.add(changeCleanup);

  return condition;
};
