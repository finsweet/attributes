import {
  addListener,
  clearFormField,
  extractCommaSeparatedValues,
  type FormField,
  type FormFieldType,
  isFormField,
  isNumber,
} from '@finsweet/attributes-utils';
import { toRaw, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { ListItem } from '../components';
import type { List } from '../components/List';
import { getCheckboxGroup } from '../utils/dom';
import { setReactive } from '../utils/reactivity';
import { getAttribute, getElementSelector, queryElement } from '../utils/selectors';
import { filterItems } from './filter';
import type { Filters, FiltersCondition } from './types';

export const initSimpleFilters = (list: List, form: HTMLFormElement) => {
  const debounces = new Map<FormField, number>();

  // Handle inputs
  const inputCleanup = addListener(form, 'input', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    const field = getAttribute(target, 'field');
    if (!field) return;

    const update = () => {
      const conditions = list.filters.groups[0]?.conditions || [];

      const data = getConditionData(target, field);

      const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === data.op);
      if (conditionIndex >= 0) {
        conditions[conditionIndex] = data;
      } else {
        conditions.push(data);
      }
    };

    const debounce = debounces.get(target);
    if (debounce) {
      clearTimeout(debounce);
    }

    // With debouncing
    const timeout = getAttribute(target, 'debounce');
    if (isNumber(timeout) && !isNaN(timeout)) {
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
 * @param field The field name.
 */
const getConditionData = (formField: FormField, field: string): FiltersCondition => {
  const type = formField.type as FormFieldType;

  const op = getConditionOperator(formField);

  const filterMatch = getAttribute(formField, 'filtermatch', { filterInvalid: true });
  const fieldMatch = getAttribute(formField, 'fieldmatch', { filterInvalid: true });

  switch (type) {
    // Checkbox
    case 'checkbox': {
      // Group
      const groupCheckboxes = getCheckboxGroup(formField.name, formField.form);
      if (groupCheckboxes?.length) {
        const values: string[] = [];

        for (const checkbox of groupCheckboxes) {
          const value = getAttribute(checkbox, 'value') ?? checkbox.value;
          if (!value || !checkbox.checked) continue;

          values.push(value);
        }

        return {
          value: values,
          field,
          op,
          filterMatch,
          fieldMatch,
          type,
        };
      }

      // Single
      const { checked } = formField as HTMLInputElement;
      const value = checked ? 'true' : '';

      return {
        value,
        field,
        op,
        filterMatch,
        fieldMatch,
        type,
      };
    }

    // Radio
    case 'radio': {
      const checkedRadio = formField.form?.querySelector<HTMLInputElement>(
        `input[name="${formField.name}"][type="radio"]:checked`
      );

      const value = checkedRadio ? getAttribute(checkedRadio, 'value') ?? checkedRadio.value : '';

      return {
        value,
        field,
        op,
        filterMatch,
        fieldMatch,
        type,
      };
    }

    // Select multiple
    case 'select-multiple': {
      const value = [...(formField as HTMLSelectElement).selectedOptions].map((option) => option.value);

      return {
        value,
        field,
        op,
        filterMatch,
        fieldMatch,
        type,
      };
    }

    // Default - Text
    case 'date':
    case 'month':
    case 'week':
    case 'time': {
      const { valueAsDate, value: _value } = formField as HTMLInputElement;
      const value = valueAsDate ? valueAsDate.toISOString() : _value;

      return {
        value,
        field,
        op,
        filterMatch,
        fieldMatch,
        type,
      };
    }

    default: {
      const { value } = formField;

      const fuzzy = getAttribute(formField, 'fuzzy');

      return {
        value,
        field,
        op,
        fuzzy,
        filterMatch,
        fieldMatch,
        type,
      };
    }
  }
};

/**
 * Retrieves the condition operator based on the form field type.
 *
 * @param formField The form field to retrieve the operator for.
 * @returns The condition operator as a string, with the proper fallback value.
 */
const getConditionOperator = (formField: FormField) => {
  const type = formField.type as FormFieldType;

  const stringInputTypes: FormFieldType[] = ['text', 'password', 'email', 'tel', 'url', 'search', 'color'];
  const opDefault = stringInputTypes.includes(type) ? 'contain' : 'equal';

  const op = getAttribute(formField, 'operator', { filterInvalid: true }) || opDefault;
  return op;
};

/**
 * @returns An object with the form fields as keys and their values as values.
 * @param form A {@link HTMLFormElement} element.
 */
export const getSimpleFilters = (form: HTMLFormElement) => {
  const filters: Filters = {
    groups: [{ conditions: [], conditionsMatch: getAttribute(form, 'conditionsmatch', { filterInvalid: true }) }],
    groupsMatch: getAttribute(form, 'groupsmatch', { filterInvalid: true }),
  };

  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type === 'submit') continue;

    const field = getAttribute(formField, 'field');
    if (!field) continue;

    const data = getConditionData(formField, field);

    if (!filters.groups[0].conditions.some((c) => c.field === field && c.op === data.op)) {
      filters.groups[0].conditions.push(data);
    }
  }

  return filters;
};

/**
 * Initializes a specific filter's results count.
 * @param list
 * @param form
 */
const initFiltersResults = (list: List, form: HTMLFormElement) => {
  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type !== 'checkbox' && type !== 'radio') continue;

    const field = getAttribute(formField, 'field');
    if (!field) continue;

    const resultsCountElement = queryElement('filter-results-count', { scope: formField.parentElement });
    if (!resultsCountElement) continue;

    const op = getConditionOperator(formField);
    const value = getAttribute(formField, 'value') || formField.value || '';

    const handler = debounce(([filters, items]: [Filters, ListItem[]]) => {
      const filtersClone = structuredClone(toRaw(filters)) as Filters;

      const conditionsGroup = filtersClone.groups[0];
      if (!conditionsGroup) return;

      const { conditions = [] } = conditionsGroup;
      const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === op);

      const condition = conditions[conditionIndex];
      if (!condition) return;

      // Inject the condition value
      if (Array.isArray(condition.value)) {
        if (condition.filterMatch === 'and') {
          condition.value.push(value);
        } else {
          condition.value = [value];
        }
      } else {
        condition.value = value;
      }

      filterItems(filtersClone, items).then((filteredItems) => {
        resultsCountElement.textContent = `${filteredItems.length}`;
      });
    }, 0);

    watch([list.filters, list.items], handler, { deep: true, immediate: true });
  }
};
