import { addListener, getFormFieldWrapper, getRadioGroupInputs, type FormField } from '@finsweet/attributes-utils';
import { effect } from '@vue/reactivity';

import type { List } from '../components';
import { getAttribute } from '../utils/selectors';

/**
 * Handles the filter-specific elements like the list element, empty element, and results count element.
 * @param list
 * @returns A cleanup function.
 */
export const handleFilterElements = (list: List) => {
  const elementsCleanup = effect(() => {
    const filteredItems = list.hooks.filter.result.value;
    const hasItems = !!filteredItems.length;

    // List
    if (list.listElement) {
      list.listElement.style.display = hasItems ? '' : 'none';
    }

    // Empty
    if (list.emptyElement.value) {
      list.emptyElement.value.style.display = hasItems ? 'none' : '';
    }

    // Results count
    if (list.resultsCountElement) {
      list.resultsCountElement.textContent = `${filteredItems.length}`;
    }
  });

  return elementsCleanup;
};

/**
 * Handles submit events for filters form.
 * @param form
 * @returns A cleanup function.
 */
export const handleFiltersForm = (form: HTMLFormElement) => {
  const allowSubmit = getAttribute(form, 'allowsubmit') === 'true';

  return addListener(form, 'submit', (e) => {
    if (!allowSubmit) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
};

/**
 * Sets the active class to a form field.
 * @param formField
 */
export const setActiveClass = (formField: FormField) => {
  const activeClass = getAttribute(formField, 'activeclass');

  switch (formField.type) {
    case 'checkbox': {
      const { checked } = formField as HTMLInputElement;
      const target = getFormFieldWrapper(formField);

      target.classList.toggle(activeClass, checked);
      break;
    }

    case 'radio': {
      const groupRadios = getRadioGroupInputs(formField);

      for (const radio of groupRadios) {
        const target = getFormFieldWrapper(radio);

        target.classList.toggle(activeClass, radio.checked);
      }

      break;
    }

    default: {
      formField.classList.toggle(activeClass, !!formField.value);
    }
  }
};
