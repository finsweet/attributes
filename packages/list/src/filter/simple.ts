import {
  addListener,
  clearFormField,
  extractCommaSeparatedValues,
  type FormField,
  isFormField,
  parseNumericAttribute,
} from '@finsweet/attributes-utils';
import { effect, toRaw, watch } from '@vue/reactivity';
import { dset } from 'dset';

import type { List } from '../components/List';
import { DEFAULT_FUZZY_RATIO } from '../utils/constants';
import { setReactive } from '../utils/reactivity';
import { getAttribute, getElementSelector, getSettingSelector, queryElement } from '../utils/selectors';
import { filterItems } from './filter';
import type { FilterOperator, Filters, FiltersCondition } from './types';

export const initSimpleFilters = (list: List, form: HTMLFormElement) => {
  const debounces = new Map<FormField, number>();

  // Handle inputs
  const inputCleanup = addListener(form, 'input', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    const field = getAttribute(target, 'field');
    if (!field) return;

    console.log({ field });

    const update = () => {
      const op = getAttribute(target, 'operator', true) || 'contains';

      const conditions = list.filters.groups[0]?.conditions || [];

      const data = getConditionData(target, field, op);

      const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === op);
      if (conditionIndex >= 0) {
        conditions[conditionIndex] = data;
      } else {
        conditions.push(data);
      }

      console.log({ conditions });

      dset(list.filters, 'groups.0.conditions', conditions);
    };

    const debounce = debounces.get(target);
    if (debounce) {
      clearTimeout(debounce);
    }

    // With debouncing
    const rawTimeout = getAttribute(target, 'debounce');
    console.log({ rawTimeout });
    if (rawTimeout) {
      const timeout = rawTimeout ? parseNumericAttribute(rawTimeout, 0) : 0;

      const timeoutId = window.setTimeout(update, timeout);

      debounces.set(target, timeoutId);

      return;
    }

    // Without debouncing
    update();
  });

  // Handle clear buttons
  const clickCleanup = addListener(form, 'click', (e) => {
    const { target } = e;

    if (!(target instanceof Element)) return;

    const clearElement = target?.closest(getElementSelector('clear'));
    if (!clearElement) return;

    const rawFilterKey = getAttribute(clearElement, 'field');
    const fieldsToClear = rawFilterKey ? extractCommaSeparatedValues(rawFilterKey) : undefined;

    for (const element of form.elements) {
      const field = getAttribute(element, 'field');

      if (!field) continue;
      if (!isFormField(element)) continue;
      if (fieldsToClear && !fieldsToClear.includes(field)) continue;

      debounces.delete(element);
      clearFormField(element);
    }
  });

  // Get initial filters
  const filters = getSimpleFilters(form);
  setReactive(list.filters, filters);

  // Get filters on node changes
  // TODO: bail when added/removed nodes are not form fields
  const mutationObserver = new MutationObserver(() => {
    const filters = getSimpleFilters(form);
    setReactive(list.filters, filters);
  });

  // mutationObserver.observe(form, {
  //   childList: true,
  //   subtree: true,
  // });

  initFiltersResults(list, form);

  return () => {
    inputCleanup();
    clickCleanup;
    mutationObserver.disconnect();
  };
};

/**
 * @returns The value of a given form field.
 * @param formField A {@link FormField} element.
 */
const getConditionData = (formField: FormField, field: string, op: FilterOperator): FiltersCondition => {
  const { type } = formField;

  switch (type) {
    // Checkbox
    case 'checkbox': {
      // Group
      const groupSelector = [
        `input[name="${formField.name}"][type="checkbox"][value]`,
        `input[name="${formField.name}"][type="checkbox"]${getSettingSelector('value')}`,
      ].join(',');

      const groupCheckboxes = formField.form?.querySelectorAll<HTMLInputElement>(groupSelector);

      if (groupCheckboxes?.length) {
        const values: string[] = [];

        for (const checkbox of groupCheckboxes) {
          const value = getAttribute(checkbox, 'value') || checkbox.value;
          if (!value || !checkbox.checked) continue;

          values.push(value);
        }

        return {
          value: values,
          field,
          op,
        };
      }

      // Single
      const value = String((formField as HTMLInputElement).checked);

      return {
        value,
        field,
        op,
      };
    }

    // Radio
    case 'radio': {
      const checkedRadio = formField.form?.querySelector<HTMLInputElement>(
        `input[name="${formField.name}"][type="radio"]:checked`
      );

      const value = checkedRadio ? getAttribute(checkedRadio, 'value') || checkedRadio.value : '';

      return {
        value,
        field,
        op,
      };
    }

    // Select multiple
    case 'select-multiple': {
      const value = [...(formField as HTMLSelectElement).selectedOptions].map((option) => option.value);

      return {
        value,
        field,
        op,
      };
    }

    // Default - Text
    default: {
      const { value } = formField;

      const rawFuzzy = getAttribute(formField, 'fuzzy');
      const fuzzy = rawFuzzy ? parseNumericAttribute(rawFuzzy, DEFAULT_FUZZY_RATIO) : DEFAULT_FUZZY_RATIO;

      return {
        value,
        field,
        op,
        fuzzy,
      };
    }
  }
};

/**
 * @returns An object with the form fields as keys and their values as values.
 * @param form A {@link HTMLFormElement} element.
 */
export const getSimpleFilters = (form: HTMLFormElement) => {
  const filters: Filters = {
    groups: [{ conditions: [] }],
  };

  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type === 'submit') continue;

    const field = getAttribute(formField, 'field');
    if (!field) continue;

    const op = getAttribute(formField, 'operator', true) || 'contains';
    const data = getConditionData(formField, field, op);

    if (!filters.groups[0].conditions.some((c) => c.field === field && c.op === op)) {
      filters.groups[0].conditions.push(data);
    }
  }

  return filters;
};

const initFiltersResults = (list: List, form: HTMLFormElement) => {
  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type !== 'checkbox') continue;

    const field = getAttribute(formField, 'field');
    if (!field) continue;

    const resultsCountElement = queryElement('filter-results-count', { scope: formField.parentElement! });
    if (!resultsCountElement) continue;

    const op = getAttribute(formField, 'operator', true) || 'contains';
    const value = getAttribute(formField, 'value') || formField.value;

    watch(
      [list.filters, list.hooks.filter.result],
      ([filters]) => {
        const filtersClone = structuredClone(toRaw(filters)) as Filters;
        console.log({ filtersClone });

        const conditions = filtersClone.groups[0]?.conditions || [];
        const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === op);

        if (!conditions[conditionIndex]) return;
        if (conditions[conditionIndex].value === value) return;

        conditions[conditionIndex].value = [value];

        const result = filterItems(filtersClone, list.hooks.filter.result.value);
        console.log(result.length);

        resultsCountElement.textContent = `${result.length}`;
      },
      { deep: true, immediate: true }
    );
  }
};
