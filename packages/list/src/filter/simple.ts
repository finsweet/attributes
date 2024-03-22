import {
  addListener,
  clearFormField,
  extractCommaSeparatedValues,
  type FormField,
  isFormField,
  parseNumericAttribute,
} from '@finsweet/attributes-utils';
import { getPath } from 'nanostores';

import type { List } from '../components/List';
import { getAttribute, getElementSelector, getSettingSelector } from '../utils/selectors';
import type { FilterOperator, Filters, FiltersCondition } from './types';

export const initSimpleFilters = (list: List, form: HTMLFormElement) => {
  const debounces = new Map<FormField, number>();

  // Handle inputs
  const inputCleanup = addListener(form, 'input', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    const rawField = getAttribute(target, 'field');
    if (!rawField) return;

    const update = () => {
      const fields =
        rawField === '*' ? Object.keys(list.items.get()[0]?.fields || {}) : extractCommaSeparatedValues(rawField);

      const op = getAttribute(target, 'operator', true) || 'contains';

      const conditions = getPath(list.filters.get(), 'groups[0].conditions');

      for (const field of fields) {
        const data = getConditionData(target, field, op);

        const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === op);
        if (conditionIndex >= 0) {
          conditions[conditionIndex] = data;
        } else {
          conditions.push(data);
        }
      }

      list.filters.setKey('groups[0].conditions', conditions);
    };

    const debounce = debounces.get(target);
    if (debounce) {
      clearTimeout(debounce);
    }

    // With debouncing
    const rawTimeout = getAttribute(target, 'debounce');
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

  return () => {
    inputCleanup();
    clickCleanup;
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

      return {
        value,
        field,
        op,
      };
    }
  }
};

/**
 * @returns An object with the form fields as keys and their values as values.
 * @param form A {@link HTMLFormElement} element.
 */
export const getSimpleFilters = (list: List, form: HTMLFormElement) => {
  const filters: Filters = {
    groups: [{ conditions: [] }],
  };

  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type === 'submit') continue;

    const rawField = getAttribute(formField, 'field');
    if (!rawField) continue;

    const fields =
      rawField === '*' ? Object.keys(list.items.get()[0]?.fields || {}) : extractCommaSeparatedValues(rawField);

    const op = getAttribute(formField, 'operator', true) || 'contains';

    for (const field of fields) {
      const data = getConditionData(formField, field, op);
      filters.groups[0].conditions.push(data);
    }
  }

  return filters;
};
