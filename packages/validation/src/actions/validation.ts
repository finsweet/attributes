// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Pristine from 'pristinejs';

import { getSettingSelector, queryAllElements, queryElement } from '../utils';

/**
 * Initializes form validation for a given wrapper element using Pristine library.
 *
 * @param wrapper The HTML element containing the form to be validated.
 * @returns An object with a `clean` function to remove event listeners and destroy the Pristine instance.
 */
export const initFormValidation = (wrapper: HTMLElement) => {
  const form = wrapper.querySelector('form');
  if (!form) return;
  const submitButton = queryElement('submit');
  if (!submitButton) return;

  const pristine = new Pristine(form);

  const inputFields = form.querySelectorAll('input');

  const requiredFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('required'));

  const errorMessages = queryAllElements('error-show', { scope: form });

  const errorClasses = new Set<string>();

  /**
   * Hides error messages and removes error classes from input fields.
   */
  const hideErrors = () => {
    errorMessages.forEach((element) => {
      element.style.display = 'none';
    });

    inputFields.forEach((field) => {
      const errorClass = field.getAttribute('errorclass');
      if (errorClass) errorClasses.add(errorClass);
      errorClasses.forEach((errorClass) => {
        field.classList.remove(errorClass);
      });
    });
  };

  hideErrors();

  requiredFields.forEach((field) => {
    pristine.addValidator(
      field,
      function () {
        const value = field.value.trim();
        return value !== '';
      },
      'Field is required'
    );
  });

  const onSubmitButtonClick = (event: Event) => {
    event.preventDefault();
    const valid = pristine.validate();

    if (!valid) {
      requiredFields.forEach((field, index) => {
        const errors = pristine.getErrors(field);
        if (errors.length > 0) {
          const errorClass = field.getAttribute('errorclass');
          if (errorClass) {
            errorClasses.add(errorClass);
            field.classList.add(errorClass);
          }
          errorMessages[index].style.display = 'block';
        } else {
          errorMessages[index].style.display = 'none';
        }
      });
    } else {
      hideErrors();
    }
  };

  submitButton.addEventListener('click', onSubmitButtonClick);

  return {
    clean: () => {
      submitButton.removeEventListener('click', onSubmitButtonClick);
      pristine.destroy();
    },
  };
};
