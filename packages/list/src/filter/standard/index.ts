import { addListener, isFormField, isNumber } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';

import type { List } from '../../components/List';
import { getAttribute, getElementSelector } from '../../utils/selectors';
import { handleFiltersForm, setActiveClass } from '../elements';
import { getConditionData, getStandardFiltersGroup, setConditionsData } from './conditions';
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

    const fieldKey = getAttribute(target, 'field');
    if (!fieldKey) return;

    const condition = getConditionData(target, fieldKey, true);

    setActiveClass(target);

    const update = () => {
      const conditions = list.filters.value.groups[groupIndex]?.conditions || [];

      const conditionIndex = conditions.findIndex((c) => c.fieldKey === fieldKey && c.op === condition.op);

      list.readingFilters = true;

      if (conditionIndex >= 0) {
        conditions[conditionIndex] = condition;
      } else {
        conditions.push(condition);
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

    const fieldKey = getAttribute(clearElement, 'field');

    const conditions = filters.value.groups[groupIndex]?.conditions || [];
    const conditionsToClear = fieldKey ? conditions.filter((condition) => condition.fieldKey === fieldKey) : conditions;

    for (const condition of conditionsToClear) {
      debounces.delete(`${condition.fieldKey}_${condition.op}`);

      if (Array.isArray(condition.value)) {
        condition.value = [];
      } else {
        condition.value = '';
      }
    }
  });
};
