import {
  FORM_CSS_CLASSES,
  type FormField,
  type FormFieldType,
  getRadioGroupInputs,
  isFormField,
  isHTMLInputElement,
  isHTMLSelectElement,
  simulateEvent,
} from '@finsweet/attributes-utils';

import type { List } from '../../components/List';
import { getCheckboxGroup } from '../../utils/dom';
import { getAttribute, getSettingSelector } from '../../utils/selectors';
import { setActiveClass } from '../elements';
import type { FiltersCondition, FiltersGroup } from '../types';

/**
 * @returns The value of a given form field.
 * @param formField A {@link FormField} element.
 * @param fieldKey The field name.
 * @param interacted Indicates if the form field has been interacted with.
 */
export const getConditionData = (formField: FormField, fieldKey: string, interacted = false): FiltersCondition => {
  const type = formField.type as FormFieldType;

  const op = getConditionOperator(formField);

  const customTagField = getAttribute(formField, 'tagfield');
  const filterMatch = getAttribute(formField, 'filtermatch', { filterInvalid: true });
  const fieldMatch = getAttribute(formField, 'fieldmatch', { filterInvalid: true });
  const fuzzyThreshold = getAttribute(formField, 'fuzzy');

  const baseData = {
    fieldKey,
    type,
    op,
    filterMatch,
    fieldMatch,
    fuzzyThreshold,
    interacted,
    customTagField,
  } satisfies Partial<FiltersCondition>;

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
          ...baseData,
          value: values,
        };
      }

      // Single
      const { checked } = formField as HTMLInputElement;
      const value = checked ? 'true' : '';

      return {
        ...baseData,
        value,
      };
    }

    // Radio
    case 'radio': {
      const checkedRadio = formField.form?.querySelector<HTMLInputElement>(
        `input[name="${formField.name}"][type="radio"]:checked`
      );

      const value = checkedRadio ? getAttribute(checkedRadio, 'value') ?? checkedRadio.value : '';

      return {
        ...baseData,
        value,
      };
    }

    // Select multiple
    case 'select-multiple': {
      const value = [...(formField as HTMLSelectElement).selectedOptions].map((option) => option.value);

      return {
        ...baseData,
        value,
      };
    }

    // Dates
    case 'date':
    case 'month':
    case 'week':
    case 'time': {
      const { valueAsDate, value: _value } = formField as HTMLInputElement;
      const value = valueAsDate ? valueAsDate.toISOString() : _value;

      return {
        ...baseData,
        value,
      };
    }

    // Default - Text
    default: {
      const { value } = formField;

      return {
        ...baseData,
        value,
      };
    }
  }
};

/**
 * Sets the form fields' values based on the provided conditions.
 * @param list
 * @param form
 * @param conditions
 */
export const setConditionsData = (list: List, form: HTMLFormElement, conditions: FiltersCondition[]) => {
  list.settingFilters = true;

  for (const { fieldKey, value, op, type } of conditions) {
    const tagSelector = `:is(input[type="${type}"], select, textarea)`;
    const fieldSelector = getSettingSelector('field', fieldKey);
    const operatorSelector = `:is(${getSettingSelector('operator', op)}, :not(${getSettingSelector('operator')}))`;
    const selector = [tagSelector, fieldSelector, operatorSelector].join('');

    const formField = form.querySelector(selector);
    if (!isFormField(formField)) continue;

    switch (type) {
      // Checkboxes
      case 'checkbox': {
        if (!isHTMLInputElement(formField)) break;

        // Single checkbox
        if (!Array.isArray(value)) {
          const check = value === 'true';

          if (check !== formField.checked) {
            formField.checked = check;

            simulateEvent(formField, ['click', 'input', 'change']);
          }

          break;
        }

        const groupCheckboxes = getCheckboxGroup(formField.name, form);
        if (!groupCheckboxes?.length) break;

        for (const checkbox of groupCheckboxes) {
          const checkboxValue = getAttribute(checkbox, 'value') ?? checkbox.value;
          const check = value.includes(checkboxValue);

          if (check !== checkbox.checked) {
            checkbox.checked = check;

            simulateEvent(checkbox, ['click', 'input', 'change']);
          }
        }

        break;
      }

      // Radios
      case 'radio': {
        if (Array.isArray(value)) break;

        const groupRadios = getRadioGroupInputs(formField, form);

        for (const radio of groupRadios) {
          const radioValue = getAttribute(radio, 'value') ?? radio.value;
          const check = radioValue === value;

          if (check !== radio.checked) {
            radio.checked = check;

            simulateEvent(radio, ['click', 'input', 'change']);

            if (check) continue;

            // When unchecking a custom Webflow radio, we need to manually remove the focus and checked classes
            const customRadio = radio.parentElement?.querySelector(`.${FORM_CSS_CLASSES.radioInput}`);
            if (!customRadio) continue;

            customRadio.classList.remove(
              FORM_CSS_CLASSES.checkboxOrRadioFocus,
              FORM_CSS_CLASSES.checkboxOrRadioChecked
            );
          }
        }

        break;
      }

      // Select-multiple
      case 'select-multiple': {
        if (!Array.isArray(value) || !isHTMLSelectElement(formField)) break;

        for (const option of formField.options) {
          const select = value.includes(option.value);

          if (select !== option.selected) {
            option.selected = select;

            simulateEvent(option, ['input', 'change']);
          }
        }

        break;
      }

      // Other
      default: {
        if (Array.isArray(value)) break;

        if (formField.value !== value) {
          formField.value = value;

          simulateEvent(formField, ['input', 'change']);
        }
      }
    }
  }

  list.settingFilters = false;
};

/**
 * Retrieves the condition operator based on the form field type.
 *
 * @param formField The form field to retrieve the operator for.
 * @returns The condition operator as a string, with the proper fallback value.
 */
export const getConditionOperator = (formField: FormField) => {
  const type = formField.type as FormFieldType;

  const stringInputTypes: FormFieldType[] = ['text', 'password', 'email', 'tel', 'url', 'search', 'color'];
  const opDefault = stringInputTypes.includes(type) ? 'contain' : 'equal';

  const op = getAttribute(formField, 'operator', { filterInvalid: true }) || opDefault;
  return op;
};

/**
 * @returns An object with the form fields as keys and their values as values.
 * @param list A {@link List} instance.
 * @param form A {@link HTMLFormElement} element.
 * @param interacted Indicates if the form has been interacted with.
 */
export const getStandardFiltersGroup = (list: List, form: HTMLFormElement, interacted = false) => {
  list.readingFilters = true;

  const group: FiltersGroup = {
    conditions: [],
    conditionsMatch: getAttribute(form, 'conditionsmatch', { filterInvalid: true }),
  };

  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type === 'submit') continue;

    const fieldKey = getAttribute(formField, 'field');
    if (!fieldKey) continue;

    const data = getConditionData(formField, fieldKey, interacted);

    setActiveClass(formField);

    if (!group.conditions.some((c) => c.fieldKey === fieldKey && c.op === data.op)) {
      group.conditions.push(data);
    }
  }

  list.readingFilters = false;

  return group;
};
