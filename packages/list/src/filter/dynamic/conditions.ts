import {
  addListener,
  cloneNode,
  extractCommaSeparatedValues,
  type FormField,
  type FormFieldType,
  isFormField,
  isHTMLSelectElement,
  Renderer,
  simulateEvent,
} from '@finsweet/attributes-utils';
import { computed, type ComputedRef, effect } from '@vue/reactivity';
import dlv from 'dlv';
import { dset } from 'dset';

import type { List } from '../../components';
import { ALLOWED_DYNAMIC_FIELD_TYPES, SETTINGS } from '../../utils/constants';
import { getAttribute, getElementSelector, queryAllElements, queryElement } from '../../utils/selectors';
import type { AllFieldsData, FilterOperator, FiltersCondition } from '../types';
import type { ConditionGroup } from './groups';
import { getFilterMatchValue, parseOperatorValue } from './utils';

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
 * @param allFieldsData
 * @returns A cleanup function
 */
export const initConditionAdd = (
  list: List,
  element: HTMLElement,
  conditionTemplate: HTMLElement,
  conditionGroup: ConditionGroup,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  const cleanup = addListener(element, 'click', () => {
    const conditionClone = cloneNode(conditionTemplate);

    const condition = initCondition(list, conditionClone, conditionGroup, allFieldsData);
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
 * Inits the condition field key select of a condition.
 * @param list
 * @param element
 * @param condition
 * @param allFieldsData
 * @returns A cleanup function
 */
const initConditionFieldKeySelect = (
  { filters }: List,
  element: HTMLSelectElement,
  condition: Condition,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  const changeCleanup = addListener(element, 'change', () => {
    dset(filters.value, `${condition.path.value}.fieldKey`, element.value);
  });

  const fieldsRunner = effect(() => {
    let invalidSelectedOption = false;

    for (const option of element.options) {
      const isValid = !!allFieldsData.value[option.value];

      option.style.display = isValid ? '' : 'none';
      option.disabled = !isValid;

      if (!isValid && option.selected) {
        option.selected = false;
        invalidSelectedOption = true;
      }
    }

    if (invalidSelectedOption) {
      simulateEvent(element, ['input', 'change']);
    }
  });

  return () => {
    changeCleanup();
    fieldsRunner.effect.stop();
  };
};

/**
 * Inits the condition operator select of a condition.
 * The options are dynamically displayed depending on the selected field key.
 * The logic for displaying options is defined in {@link ALLOWED_DYNAMIC_FIELD_TYPES}.
 * @param list
 * @param element
 * @param condition
 * @param allFieldsData
 * @returns A cleanup function
 */
const initConditionOperatorSelect = (
  { filters }: List,
  element: HTMLSelectElement,
  condition: Condition,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  // Change listener
  const changeCleanup = addListener(element, 'change', () => {
    const { op, fieldMatch = SETTINGS.fieldmatch.defaultValue } = parseOperatorValue(element.value);

    dset(filters.value, `${condition.path.value}.op`, op);
    dset(filters.value, `${condition.path.value}.fieldMatch`, fieldMatch);
  });

  // Options display logic
  const optionsRunner = effect(() => {
    const { fieldKey, value: filterValue }: FiltersCondition = dlv(filters.value, condition.path.value);
    const fieldData = fieldKey ? allFieldsData.value[fieldKey] : undefined;

    let invalidSelectedOption = false;

    // Collect all options data
    type OptionData = { option: HTMLOptionElement } & ReturnType<typeof parseOperatorValue>;

    const { optionsData, optionsDataByOp, optionsToHide, optionsToDisplay } = [...element.options].reduce<{
      optionsData: OptionData[];
      optionsDataByOp: Map<FilterOperator, OptionData[]>;
      optionsToHide: HTMLOptionElement[];
      optionsToDisplay: HTMLOptionElement[];
    }>(
      (acc, option) => {
        const invalid = () => {
          acc.optionsToHide.push(option);
          return acc;
        };

        if (!option.value) return invalid();
        if (!fieldData) return invalid();

        const operatorData = parseOperatorValue(option.value);
        if (!operatorData.op) return invalid();

        let isFieldKeyValid = !operatorData.fieldKey;

        if (operatorData.fieldKey) {
          const fieldKeys =
            operatorData.fieldKey === '*'
              ? Object.keys(allFieldsData.value)
              : extractCommaSeparatedValues(operatorData.fieldKey);

          isFieldKeyValid = fieldKeys.some((key) => key === fieldKey);
        }

        if (!isFieldKeyValid) return invalid();

        const isValid = !!ALLOWED_DYNAMIC_FIELD_TYPES[fieldData.type]?.[fieldData.valueType]?.[operatorData.op];
        if (!isValid) return invalid();

        const optionData: OptionData = { option, ...operatorData };

        acc.optionsData.push(optionData);
        acc.optionsDataByOp.set(operatorData.op, [...(acc.optionsDataByOp.get(operatorData.op) || []), optionData]);

        return acc;
      },
      {
        optionsData: [],
        optionsDataByOp: new Map(),
        optionsToHide: [],
        optionsToDisplay: [],
      }
    );

    const isMultiFieldValue = fieldData?.valueType === 'multiple';

    for (const { op, option, fieldMatch = SETTINGS.fieldmatch.defaultValue } of optionsData) {
      const opOptionsData = optionsDataByOp.get(op!) || [];

      let optionWithPreference;

      if (isMultiFieldValue) {
        optionWithPreference =
          opOptionsData.find((other) => other.fieldMatch === fieldMatch) ||
          opOptionsData.find((other) => other.fieldMatch) ||
          opOptionsData.find((other) => !other.fieldMatch);
      } else {
        optionWithPreference = opOptionsData.find((other) => !other.fieldMatch);
      }

      const otherOptionHasPreference = optionWithPreference?.option !== option;
      if (otherOptionHasPreference) {
        optionsToHide.push(option);
      } else {
        optionsToDisplay.push(option);
      }
    }

    for (const option of optionsToDisplay) {
      option.style.display = '';
      option.disabled = false;
    }

    for (const option of optionsToHide) {
      option.style.display = 'none';
      option.disabled = true;

      if (option.selected) {
        option.selected = false;
        invalidSelectedOption = true;
      }
    }

    // If the selected option has changed, trigger an event
    if (invalidSelectedOption) {
      simulateEvent(element, ['input', 'change']);
    }
  });

  return () => {
    changeCleanup();
    optionsRunner.effect.stop();
  };
};

/**
 * Initializes the condition value form fields.
 * @param list
 * @param initialFormField
 * @param conditionElement
 * @param condition
 * @param allFieldsData
 * @returns A cleanup function
 */
const initConditionValueField = (
  { instance, filters }: List,
  initialFormField: FormField,
  conditionElement: HTMLElement,
  condition: Condition,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  const conditionValueFieldAnchor = new Comment();
  initialFormField.after(conditionValueFieldAnchor);

  const conditionSelector = getElementSelector('condition', { instance });
  const conditionFormFieldSelector = getElementSelector('condition-value', { instance });
  const externalConditionValueSelector = `:is(${conditionFormFieldSelector}):not(:is(${conditionSelector}) :is(${conditionFormFieldSelector}))`;

  const internalConditionFormFields = queryAllElements('condition-value', { scope: conditionElement });
  const externalConditionFormFields = document.querySelectorAll<HTMLElement>(externalConditionValueSelector);

  const allConditionFormFields = new Map<FormFieldType, FormField>();

  for (const internalConditionFormField of internalConditionFormFields) {
    if (!isFormField(internalConditionFormField)) continue;

    const type = internalConditionFormField.type as FormFieldType;
    if (allConditionFormFields.has(type)) continue;

    allConditionFormFields.set(type, internalConditionFormField);
  }

  for (const externalConditionFormField of externalConditionFormFields) {
    if (!isFormField(externalConditionFormField)) continue;

    const type = externalConditionFormField.type as FormFieldType;
    if (allConditionFormFields.has(type)) continue;

    const clone = cloneNode(externalConditionFormField);
    allConditionFormFields.set(type, clone);
  }

  let activeFormFieldType: FormFieldType | undefined;

  const changeHandler = () => {
    if (!activeFormFieldType) return;

    const activeFormField = allConditionFormFields.get(activeFormFieldType)!;

    const value = getConditionValue(activeFormField);
    const fuzzyThreshold = getAttribute(activeFormField, 'fuzzy');

    dset(filters.value, `${condition.path.value}.value`, value);
    dset(filters.value, `${condition.path.value}.fuzzyThreshold`, fuzzyThreshold);
    dset(filters.value, `${condition.path.value}.type`, activeFormFieldType);
  };

  const changeCleanups = [...allConditionFormFields].map(([, formField]) => {
    const event = getAttribute(formField, 'filteron', { filterInvalid: true });
    const target = event === 'submit' ? formField.form : formField;

    return addListener(target, event, changeHandler);
  });

  const formFieldsRunner = effect(() => {
    const { fieldKey, op }: FiltersCondition = dlv(filters.value, condition.path.value);
    const fieldData = fieldKey ? allFieldsData.value[fieldKey] : undefined;

    let allowedFormFields: FormFieldType[] = [];

    if (fieldData && op) {
      allowedFormFields = ALLOWED_DYNAMIC_FIELD_TYPES[fieldData.type]?.[fieldData.valueType]?.[op] || [];
    }

    const previouslyActiveFormFieldType = activeFormFieldType;

    activeFormFieldType = allowedFormFields.find((type) => allConditionFormFields.has(type));

    for (const [type, formField] of allConditionFormFields) {
      if (type === activeFormFieldType) {
        conditionValueFieldAnchor.after(formField);
      } else {
        formField.remove();
      }
    }

    if (activeFormFieldType && previouslyActiveFormFieldType !== activeFormFieldType) {
      const activeFormField = allConditionFormFields.get(activeFormFieldType)!;

      if (isHTMLSelectElement(activeFormField)) {
        activeFormField.selectedIndex = 0;
      } else {
        activeFormField.value = '';
      }

      simulateEvent(activeFormField, ['input', 'change']);
    }
  });

  const optionsRunner = effect(() => {
    const selectElements = [...allConditionFormFields.values()].filter(isHTMLSelectElement);
    if (!selectElements.length) return;

    const { fieldKey }: FiltersCondition = dlv(filters.value, condition.path.value);
    const fieldData = fieldKey ? allFieldsData.value[fieldKey] : undefined;
    const rawValues = fieldData?.rawValues || new Set<string>();

    const valuesToAdd = new Set(rawValues);

    const activeSelect = activeFormFieldType ? allConditionFormFields.get(activeFormFieldType) : undefined;
    if (!isHTMLSelectElement(activeSelect)) return;

    let invalidSelectedOption = false;

    for (const option of [...activeSelect.options]) {
      const isValid = option.value === '' || valuesToAdd.has(option.value);

      if (!isValid) {
        option.remove();
        invalidSelectedOption = true;
      }

      valuesToAdd.delete(option.value);
    }

    for (const value of valuesToAdd) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;

      activeSelect.append(option);
    }

    if (invalidSelectedOption) {
      simulateEvent(activeSelect, ['input', 'change']);
    }
  });

  return () => {
    for (const cleanup of changeCleanups) {
      cleanup();
    }

    formFieldsRunner.effect.stop();
    optionsRunner.effect.stop();
  };
};

/**
 * Retrieves the value from a condition value field.
 * @param conditionValueField
 */
const getConditionValue = (conditionValueField: FormField) => {
  const type = conditionValueField.type as FormFieldType;

  let value: string | string[];

  switch (type) {
    // Select multiple
    case 'select-multiple': {
      value = [...(conditionValueField as HTMLSelectElement).selectedOptions]
        .map((option) => option.value)
        .filter(Boolean);
      break;
    }

    // Dates
    case 'date':
    case 'month':
    case 'week':
    case 'time': {
      const { valueAsDate, value: _value } = conditionValueField as HTMLInputElement;

      value = valueAsDate ? valueAsDate.toISOString() : _value;
      break;
    }

    // Default - Text
    default: {
      value = conditionValueField.value;
    }
  }

  return value;
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
  const fieldKey = conditionFieldSelect.value;
  const type = conditionValueField.type as FormFieldType;
  const { op, fieldMatch } = parseOperatorValue(conditionOperatorSelect.value);

  const value = getConditionValue(conditionValueField);
  const fuzzyThreshold = getAttribute(conditionValueField, 'fuzzy');

  return {
    type,
    fieldKey,
    op,
    value,
    fuzzyThreshold,
    fieldMatch,
  };
};

/**
 * Inits a condition
 * @param list
 * @param element
 * @param conditionGroup
 * @param allFieldsData
 * @returns A cleanup function
 */
export const initCondition = (
  list: List,
  element: HTMLElement,
  conditionGroup: ConditionGroup,
  allFieldsData: ComputedRef<AllFieldsData>
) => {
  const conditionFieldKeySelect = queryElement('condition-field', { scope: element });
  if (!isHTMLSelectElement(conditionFieldKeySelect)) return;

  const conditionOperatorSelect = queryElement('condition-operator', { scope: element });
  if (!isHTMLSelectElement(conditionOperatorSelect)) return;

  const initialConditionValueFormField = queryElement('condition-value', { scope: element });
  if (!isFormField(initialConditionValueFormField)) return;

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

      conditionGroup.conditions.value.splice($conditionIndex, 1);
      conditionGroup.conditions.value = [...conditionGroup.conditions.value];

      list.filters.value.groups[$groupIndex].conditions.splice($conditionIndex, 1);
    },
  };

  conditionGroup.conditions.value = [...conditionGroup.conditions.value, condition];

  // Handle remove button
  const conditionRemoveButton = queryElement('condition-remove', { scope: element });
  if (conditionRemoveButton) {
    const cleanup = initConditionRemove(conditionRemoveButton, condition, conditionGroup);
    cleanups.add(cleanup);
  }

  // Test
  const initialConditionData = getConditionData(
    conditionFieldKeySelect,
    conditionOperatorSelect,
    initialConditionValueFormField
  );
  if (initialConditionData) {
    dset(list.filters.value, condition.path.value, initialConditionData);
  }

  const conditionFieldKeySelectCleanup = initConditionFieldKeySelect(
    list,
    conditionFieldKeySelect,
    condition,
    allFieldsData
  );
  cleanups.add(conditionFieldKeySelectCleanup);

  const conditionOperatorSelectCleanup = initConditionOperatorSelect(
    list,
    conditionOperatorSelect,
    condition,
    allFieldsData
  );
  cleanups.add(conditionOperatorSelectCleanup);

  const conditionValueFieldCleanup = initConditionValueField(
    list,
    initialConditionValueFormField,
    element,
    condition,
    allFieldsData
  );
  cleanups.add(conditionValueFieldCleanup);

  return condition;
};
