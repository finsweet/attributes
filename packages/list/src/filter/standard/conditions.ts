import {
  type FormField,
  type FormFieldType,
  getCheckboxGroup,
  getFormFieldValue,
  getRadioGroupInputs,
  isFormField,
  isString,
  setFormFieldValue,
} from '@finsweet/attributes-utils';

import type { List } from '../../components/List';
import {
  CUSTOM_VALUE_ATTRIBUTE,
  getAttribute,
  getSettingSelector,
  getSplitSeparator,
  hasAttributeValue,
} from '../../utils/selectors';
import type { FiltersCondition, FiltersGroup } from '../types';
import { splitValue } from '../utils';

/**
 * @returns The value of a given form field.
 * @param formField A {@link FormField} element.
 * @param fieldKey The field name.
 * @param interacted Indicates if the form field has been interacted with.
 */
export const getConditionData = (formField: FormField, fieldKey: string, interacted = false): FiltersCondition => {
  const type = formField.type as FormFieldType;

  const op = getConditionOperator(formField);
  const id = `${fieldKey}_${op}`;

  const tagCustomField = getAttribute(formField, 'tagfield');
  const tagCustomValues = getTagCustomValues(formField);
  const tagValuesDisplay = getAttribute(formField, 'tagvalues', { filterInvalid: true });
  const filterMatch = getAttribute(formField, 'filtermatch', { filterInvalid: true });
  const fieldMatch = getAttribute(formField, 'fieldmatch', { filterInvalid: true });
  const fuzzyThreshold = getAttribute(formField, 'fuzzy');
  const showTag = !hasAttributeValue(formField, 'showtag', 'false');
  const splitSeparator = getSplitSeparator(formField);

  let value = getFormFieldValue(formField, CUSTOM_VALUE_ATTRIBUTE);

  if (isString(value) && splitSeparator) {
    value = splitValue(value, splitSeparator);
  }

  return {
    id,
    fieldKey,
    type,
    op,
    value,
    filterMatch,
    fieldMatch,
    fuzzyThreshold,
    interacted,
    tagCustomField,
    tagCustomValues,
    tagValuesDisplay,
    showTag,
  };
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

    setFormFieldValue(formField, value, CUSTOM_VALUE_ATTRIBUTE);
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
 * @param groupIndex The index of the group.
 * @param interacted Indicates if the form has been interacted with.
 */
export const getStandardFiltersGroup = (list: List, form: HTMLFormElement, groupIndex: number, interacted = false) => {
  list.readingFilters = true;

  const group: FiltersGroup = {
    id: groupIndex.toString(),
    conditions: [],
    conditionsMatch: getAttribute(form, 'conditionsmatch', { filterInvalid: true }),
  };

  for (const formField of form.elements) {
    if (!isFormField(formField)) continue;

    const { type } = formField;
    if (type === 'submit') continue;

    const fieldKey = getAttribute(formField, 'field')?.trim();
    if (!fieldKey) continue;

    const data = getConditionData(formField, fieldKey, interacted);

    if (!group.conditions.some((c) => c.fieldKey === fieldKey && c.op === data.op)) {
      group.conditions.push(data);
    }
  }

  list.readingFilters = false;

  return group;
};

/**
 * @returns A map of tag values for a given form field.
 * @param formField
 */
const getTagCustomValues = (formField: FormField): Map<string, string> | undefined => {
  let tagCustomValues: Map<string, string> | undefined;

  const type = formField.type as FormFieldType;

  switch (type) {
    case 'checkbox': {
      // Group
      const groupCheckboxes = getCheckboxGroup(formField.name, formField.form, CUSTOM_VALUE_ATTRIBUTE);
      if (groupCheckboxes?.length) {
        for (const checkbox of groupCheckboxes) {
          const checkboxValue = checkbox.getAttribute(CUSTOM_VALUE_ATTRIBUTE) ?? checkbox.value;
          if (!checkboxValue) continue;

          const tagValue = getAttribute(checkbox, 'tagvalue');
          if (!tagValue) continue;

          tagCustomValues ||= new Map<string, string>();
          tagCustomValues.set(checkboxValue, tagValue);
        }

        break;
      }

      // Single
      const tagValue = getAttribute(formField, 'tagvalue');
      if (!tagValue) break;

      tagCustomValues = new Map<string, string>([['true', tagValue]]);
      break;
    }

    case 'radio': {
      const groupRadios = getRadioGroupInputs(formField);
      if (!groupRadios?.length) break;

      for (const radio of groupRadios) {
        const radioValue = radio.getAttribute(CUSTOM_VALUE_ATTRIBUTE) ?? radio.value;
        if (!radioValue) continue;

        const tagValue = getAttribute(radio, 'tagvalue');
        if (!tagValue) continue;

        tagCustomValues ||= new Map<string, string>();
        tagCustomValues.set(radioValue, tagValue);
      }

      break;
    }
  }

  return tagCustomValues;
};
