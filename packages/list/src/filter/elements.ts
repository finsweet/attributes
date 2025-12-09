import {
  addListener,
  type FormField,
  getFormFieldWrapper,
  getRadioGroupInputs,
  isFormField,
  isHTMLInputElement,
} from '@finsweet/attributes-utils';
import { effect } from '@vue/reactivity';

import type { List } from '../components';
import { getAttribute, hasAttributeValue } from '../utils/selectors';

/**
 * Handles the filter-specific elements like the list element, empty element, and results count element.
 * @param list
 * @returns A cleanup function.
 */
export const handleFilterElements = (list: List) => {
  const elementsRunner = effect(() => {
    const filteredItems = list.hooks.filter.result.value;

    // Results count
    if (list.resultsCountElement) {
      list.resultsCountElement.textContent = `${filteredItems.length}`;
    }
  });

  return () => elementsRunner.effect.stop();
};

/**
 * Handles submit events for filters form.
 * Handles the active class for form fields.
 * @param form
 * @returns A cleanup function.
 */
export const handleFiltersForm = (form: HTMLFormElement) => {
  const allowSubmit = hasAttributeValue(form, 'allowsubmit', 'true');

  const submitCleanup = addListener(form, 'submit', (e) => {
    if (allowSubmit) return;

    e.preventDefault();
    e.stopPropagation();

    // Blur active input on mobile devices to close virtual keyboard
    const { activeElement } = document;

    const isTouch = matchMedia('(pointer: coarse)').matches;
    const isMobileUA = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    const isVirtualKeyboardLikely = isTouch || isMobileUA;

    if (isVirtualKeyboardLikely && isHTMLInputElement(activeElement)) {
      activeElement.blur();
    }
  });

  const changeCleanup = addListener(form, 'change', (e) => {
    const { target } = e;

    if (!isFormField(target)) return;

    setActiveClass(target);
  });

  return () => {
    submitCleanup();
    changeCleanup();
  };
};

/**
 * Sets the active class to a form field.
 * @param formField
 */
const setActiveClass = (formField: FormField) => {
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
