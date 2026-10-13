import { addListener, type FormField, getRadioGroupInputs, isFormField, isNumber } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';

import type { List } from '../../components/List';
import { getAttribute, getElementSelector } from '../../utils/selectors';
import { handleFiltersForm } from '../elements';
import type { FiltersCondition } from '../types';
import { getConditionData, getConditionOperator, getStandardFiltersGroup, setConditionsData } from './conditions';
import { initFacets } from './facets';

/**
 * Initializes standard filters for a list.
 * @param list
 * @param form
 * @returns A cleanup function.
 */
export const initStandardFilters = (list: List, forms: HTMLFormElement[]) => {
  const cleanups = forms.map((form, groupIndex) => initStandardFiltersForm(list, form, groupIndex));

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
};

/**
 * Initializes standard filters for a list.
 * @param list
 * @param form
 * @param groupIndex
 * @returns A cleanup function.
 */
const initStandardFiltersForm = (list: List, form: HTMLFormElement, groupIndex: number) => {
  const debounces = new Map<string, number>();

  // Handle inputs
  const formElementCleanup = handleFiltersForm(form);
  const formFieldsCleanup = handleFormFields(list, form, groupIndex, debounces);

  // Handle clear buttons
  const clickCleanup = handleClearButtons(list, groupIndex, debounces);

  // Get initial filters
  const groupsMatch = getAttribute(form, 'groupsmatch', { filterInvalid: true });

  list.filters.value.groupsMatch ||= groupsMatch;
  list.filters.value.groups[groupIndex] = getStandardFiltersGroup(list, form, groupIndex);

  // 2 way binding
  const twoWayBindingCleanup = watch(
    () => list.filters.value.groups[groupIndex]?.conditions,
    (conditions) => {
      if (list.readingFilters) return;

      setConditionsData(list, form, conditions);
    },
    { deep: true }
  );

  const facetCountsCleanup = initFacets(list, form, groupIndex);

  return () => {
    formElementCleanup();
    formFieldsCleanup();
    clickCleanup();
    twoWayBindingCleanup();
    facetCountsCleanup();
  };
};

/**
 * Handles the form inputs.
 * @param list
 * @param form
 * @param debounces
 * @returns A cleanup function.
 */
const handleFormFields = (list: List, form: HTMLFormElement, groupIndex: number, debounces: Map<string, number>) => {
  const event = getAttribute(form, 'filteron', { filterInvalid: true });

  // submit
  if (event === 'submit') {
    return addListener(form, 'submit', () => {
      list.readingFilters = true;

      list.filters.value.groups[groupIndex] = getStandardFiltersGroup(list, form, groupIndex, true);

      list.readingFilters = false;
    });
  }

  // input / change
  return addListener(form, event, (e) => {
    if (list.settingFilters) return;

    const { target } = e;

    if (!isFormField(target)) return;

    const fieldKey = getAttribute(target, 'field')?.trim();
    if (!fieldKey) return;

    const condition = getConditionData(target, fieldKey, true);
    const siblingConditions = getRadioSiblingConditions(target, fieldKey, condition.op);

    const update = () => {
      const conditions = list.filters.value.groups[groupIndex]?.conditions || [];

      list.readingFilters = true;

      for (const newCondition of [condition, ...siblingConditions]) {
        const conditionIndex = conditions.findIndex((c) => c.fieldKey === fieldKey && c.op === newCondition.op);

        if (conditionIndex >= 0) {
          conditions[conditionIndex] = newCondition;
        } else {
          conditions.push(newCondition);
        }
      }

      list.readingFilters = false;
    };

    const debounceKey = `${fieldKey}_${condition.op}`;
    const debounce = debounces.get(debounceKey);

    if (debounce) {
      clearTimeout(debounce);
    }

    // With debouncing
    const timeout = getAttribute(target, 'debounce');

    if (isNumber(timeout) && !isNaN(timeout)) {
      const timeoutId = window.setTimeout(update, timeout);

      debounces.set(debounceKey, timeoutId);
      return;
    }

    // Without debouncing
    update();
  });
};

/**
 * Native radio groups uncheck the previously selected radio without firing any event on it.
 * When the radios of a group use different operators, their conditions must be updated too.
 * @param target
 * @param fieldKey
 * @param op The operator of the target's condition.
 * @returns The conditions of the other operators used in the target's radio group.
 */
const getRadioSiblingConditions = (target: FormField, fieldKey: string, op: FiltersCondition['op']) => {
  const siblingConditions: FiltersCondition[] = [];

  if (target.type !== 'radio') return siblingConditions;

  for (const radio of getRadioGroupInputs(target)) {
    if (getAttribute(radio, 'field')?.trim() !== fieldKey) continue;

    const radioOp = getConditionOperator(radio);
    if (radioOp === op || siblingConditions.some((c) => c.op === radioOp)) continue;

    siblingConditions.push(getConditionData(radio, fieldKey, true));
  }

  return siblingConditions;
};

/**
 * Handles the clear buttons.
 * @param list
 * @param debounces
 * @returns A cleanup function.
 */
const handleClearButtons = (list: List, groupIndex: number, debounces: Map<string, number>) => {
  return addListener(window, 'click', (e) => {
    const { target } = e;

    if (!(target instanceof Element)) return;

    const { instance, filters } = list;

    const clearElementSelector = getElementSelector('clear', { instance });
    const clearElement = target?.closest(clearElementSelector);
    if (!clearElement) return;

    const fieldKey = getAttribute(clearElement, 'field')?.trim();

    const conditions = filters.value.groups[groupIndex]?.conditions || [];
    const conditionsToClear = fieldKey ? conditions.filter((condition) => condition.fieldKey === fieldKey) : conditions;

    for (const condition of conditionsToClear) {
      debounces.delete(`${condition.fieldKey}_${condition.op}`);

      const updated: Partial<FiltersCondition> = {
        value: Array.isArray(condition.value) ? [] : '',
        interacted: false,
      };

      Object.assign(condition, updated);
    }
  });
};
