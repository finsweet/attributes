import { type FormField, isFormField } from '@finsweet/attributes-utils';

import { getAttribute, getSettingSelector } from '../utils/selectors';
import type { FilterData, FilterOperator, FiltersData } from './types';

/**
 * @returns An object with the form fields as keys and their values as values.
 * @param form A {@link HTMLFormElement} element.
 */
export const getFiltersData = (form: HTMLFormElement) => {
  const data: FiltersData = {};

  for (const field of form.elements) {
    if (!isFormField(field)) continue;

    const { type } = field;
    if (type === 'submit') continue;

    const rawFieldKey = getAttribute(field, 'field');
    if (!rawFieldKey) continue;

    data[rawFieldKey] ||= getFilterData(field);
  }

  return data;
};

/**
 * @returns The value of a given form field.
 * @param field A {@link FormField} element.
 */
export const getFilterData = (field: FormField): FilterData => {
  const op: FilterOperator = getAttribute(field, 'operator', true) || 'includes';
  const { type } = field;

  switch (type) {
    // Checkbox
    case 'checkbox': {
      // Group
      const groupSelector = [
        `input[name="${field.name}"][type="checkbox"][value]`,
        `input[name="${field.name}"][type="checkbox"]${getSettingSelector('value')}`,
      ].join(',');

      const groupCheckboxes = field.form?.querySelectorAll<HTMLInputElement>(groupSelector);

      if (groupCheckboxes?.length) {
        const values: string[] = [];

        for (const checkbox of groupCheckboxes) {
          const value = getAttribute(checkbox, 'value') || checkbox.value;
          if (!value || !checkbox.checked) continue;

          values.push(value);
        }

        return {
          type: 'multiple',
          value: values,
          op,
        };
      }

      // Single
      const value = (field as HTMLInputElement).checked ? 'true' : null;

      return {
        type: 'checkbox',
        value,
        op,
      };
    }

    // Radio
    case 'radio': {
      const checkedRadio = field.form?.querySelector<HTMLInputElement>(
        `input[name="${field.name}"][type="radio"]:checked`
      );

      const value = checkedRadio ? getAttribute(checkedRadio, 'value') || checkedRadio.value : null;

      return {
        type,
        value,
        op,
      };
    }

    // Numeric
    case 'number':
    case 'range': {
      const value = field.value ? Number(field.value) : null;

      return {
        type: 'number',
        value,
        op,
      };
    }

    // Date
    case 'date': {
      const value = (field as HTMLInputElement).valueAsDate || null;

      return {
        type,
        value,
        op,
      };
    }

    // Select multiple
    case 'select-multiple': {
      const value = [...(field as HTMLSelectElement).selectedOptions].map((option) => option.value);

      return {
        type: 'multiple',
        value,
        op,
      };
    }

    // Default - Text
    default: {
      const { value } = field;

      return {
        type: 'text',
        value,
        op,
      };
    }
  }
};
