import {
  addListener,
  FORM_CSS_CLASSES,
  type FormField,
  type FormFieldType,
  getRadioGroupInputs,
  isFormField,
  isHTMLInputElement,
  isHTMLSelectElement,
  isNumber,
} from '@finsweet/attributes-utils';
import { toRaw, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { ListItem } from '../components';
import type { List } from '../components/List';
import { getCheckboxGroup } from '../utils/dom';
import { setReactive } from '../utils/reactivity';
import { getAttribute, getElementSelector, getSettingSelector, queryElement } from '../utils/selectors';
import { filterItems } from './filter';
import type { Filters, FiltersCondition } from './types';

export const initSimpleFilters = (list: List, form: HTMLFormElement) => {
  const debounces = new Map<string, number>();

  // Handle inputs
  const inputCleanup = handleInputs(list, form, debounces);

  // Handle clear buttons
  const clickCleanup = handleClearButtons(list, debounces);

  // Get initial filters
  const filters = getSimpleFilters(list, form);
  setReactive(list.filters, filters);

  // 2 way binding
  const twoWayBindingCleanup = watch(
    list.filters.groups[0]?.conditions,
    (conditions) => {
      if (list.readingFilters) return;

      setConditionsData(form, conditions);
    },
    { deep: true }
  );

  // Get filters on node changes
  // TODO: bail when added/removed nodes are not form fields
  const mutationObserver = new MutationObserver(() => {
    const filters = getSimpleFilters(list, form);
    setReactive(list.filters, filters);
  });

  // mutationObserver.observe(form, {
  //   childList: true,
  //   subtree: true,
  // });

  const filterResultsCleanup = initFiltersResults(list, form);

  return () => {
    inputCleanup();
    clickCleanup();
    twoWayBindingCleanup();
    filterResultsCleanup();
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
  const activeClass = getAttribute(formField, 'activeclass');

  const baseData = {
    field,
    type,
    op,
    filterMatch,
    fieldMatch,
    activeClass,
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

      const fuzzy = getAttribute(formField, 'fuzzy');

      return {
        ...baseData,
        value,
        fuzzy,
      };
    }
  }
};

/**
 * Sets the form fields' values based on the provided conditions.
 * @param form
 * @param conditions
 */
export const setConditionsData = (form: HTMLFormElement, conditions: FiltersCondition[]) => {
  for (const { field, value, op, type } of conditions) {
    const tagSelector = `:is(input, select, textarea)[type="${type}"]`;
    const fieldSelector = getSettingSelector('field', field);
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
          formField.checked = value === 'true';

          break;
        }

        const groupCheckboxes = getCheckboxGroup(formField.name, form);
        if (!groupCheckboxes?.length) break;

        for (const checkbox of groupCheckboxes) {
          const checkboxValue = getAttribute(checkbox, 'value') ?? checkbox.value;

          checkbox.checked = value.includes(checkboxValue);
        }

        break;
      }

      // Radios
      case 'radio': {
        if (Array.isArray(value)) break;

        const groupRadios = getRadioGroupInputs(formField, form);

        for (const radio of groupRadios) {
          const radioValue = getAttribute(radio, 'value') ?? radio.value;

          radio.checked = radioValue === value;
        }
      }

      // Select-multiple
      case 'select-multiple': {
        if (!Array.isArray(value) || !isHTMLSelectElement(formField)) break;

        for (const option of formField.options) {
          option.selected = value.includes(option.value);
        }

        break;
      }

      // Other
      default: {
        if (Array.isArray(value)) break;

        formField.value = value;
      }
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
const getSimpleFilters = (list: List, form: HTMLFormElement) => {
  list.readingFilters = true;

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

    setActiveClass(formField, data.activeClass);

    if (!filters.groups[0].conditions.some((c) => c.field === field && c.op === data.op)) {
      filters.groups[0].conditions.push(data);
    }
  }

  list.readingFilters = false;

  return filters;
};

/**
 * Initializes a specific filter's results count.
 * @param list
 * @param form
 */
const initFiltersResults = (list: List, form: HTMLFormElement) => {
  const cleanups = [...form.elements].map((formField) => {
    if (!isFormField(formField)) return;

    const { type } = formField;
    if (type !== 'checkbox' && type !== 'radio') return;

    const field = getAttribute(formField, 'field');
    if (!field) return;

    const resultsCountElement = queryElement('filter-results-count', { scope: formField.parentElement });
    if (!resultsCountElement) return;

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

    const cleanup = watch([list.filters, list.items], handler, { deep: true, immediate: true });
    return cleanup;
  });

  return () => {
    for (const cleanup of cleanups) {
      cleanup?.();
    }
  };
};

/**
 * Handles the form inputs.
 * @param list
 * @param form
 * @param debounces
 * @returns A cleanup function.
 */
const handleInputs = (list: List, form: HTMLFormElement, debounces: Map<string, number>) => {
  return addListener(form, 'input', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    const field = getAttribute(target, 'field');
    if (!field) return;

    const condition = getConditionData(target, field);

    setActiveClass(target, condition.activeClass);

    const update = () => {
      const conditions = list.filters.groups[0]?.conditions || [];

      const conditionIndex = conditions.findIndex((c) => c.field === field && c.op === condition.op);

      list.readingFilters = true;

      if (conditionIndex >= 0) {
        conditions[conditionIndex] = condition;
      } else {
        conditions.push(condition);
      }

      list.readingFilters = false;
    };

    const debounceKey = `${field}_${condition.op}`;
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
const handleClearButtons = (list: List, debounces: Map<string, number>) => {
  return addListener(window, 'click', (e) => {
    const { target } = e;

    if (!(target instanceof Element)) return;

    const { instance, filters } = list;

    const clearElementSelector = getElementSelector('clear', { instance });
    const clearElement = target?.closest(clearElementSelector);
    if (!clearElement) return;

    const field = getAttribute(clearElement, 'field');

    const conditions = filters.groups[0]?.conditions || [];
    const conditionsToClear = field ? conditions.filter((condition) => condition.field === field) : conditions;

    for (const condition of conditionsToClear) {
      debounces.delete(`${condition.field}_${condition.op}`);

      if (Array.isArray(condition.value)) {
        condition.value = [];
      } else {
        condition.value = '';
      }
    }
  });
};

/**
 * Sets the active class to a form field.
 * @param formField
 * @param activeClass
 */
const setActiveClass = (formField: FormField, activeClass: string) => {
  switch (formField.type) {
    case 'checkbox': {
      const { checked } = formField as HTMLInputElement;
      const checkboxParent = formField.closest(`.${FORM_CSS_CLASSES.checkboxField}`);
      const target = checkboxParent || formField;

      target.classList.toggle(activeClass, checked);
      break;
    }

    case 'radio': {
      const groupRadios = getRadioGroupInputs(formField);

      for (const radio of groupRadios) {
        const radioParent = radio.closest(`.${FORM_CSS_CLASSES.radioField}`);
        const target = radioParent || radio;

        target.classList.toggle(activeClass, radio.checked);
      }

      break;
    }

    default: {
      formField.classList.toggle(activeClass, !!formField.value);
    }
  }
};
