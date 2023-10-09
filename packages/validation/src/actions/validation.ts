// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Pristine from 'pristinejs';

import { getAttribute, getSettingSelector, queryElement } from '../utils';
import type { IValidationField } from '../utils/types';

/**
 * Initializes form validation for a given wrapper element using Pristine library.
 *
 * @param wrapper The HTML element containing the form to be validated.
 * @returns An object with a `clean` function to remove event listeners and destroy the Pristine instance.
 */
export const initFormValidation = (wrapper: HTMLElement) => {
  const form = wrapper.querySelector('form');
  if (!form) return;
  const submitButton = queryElement('submit', { scope: form });
  if (!submitButton) return;

  const pristine = new Pristine(form);

  const inputFields = form.querySelectorAll<HTMLElement>('input:not([type="checkbox"]):not([type="submit"]), textarea');
  const validationFields: IValidationField[] = [];

  const requiredFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('required'));
  const minValueFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('minvalue'));
  const maxValueFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('maxvalue'));
  const minLengthFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('minlength'));
  const maxLengthFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('maxlength'));
  const checkboxFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('mincheckbox'));
  const rejectFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('reject'));

  // Prepare regular inputs
  inputFields.forEach((inputElement) => {
    const parent = inputElement.parentNode;

    if (!parent) return;

    const errorMessages = queryElement('error-show', { scope: parent });
    const successMessages = queryElement('success-show', { scope: parent });

    const inputErrorPair = {
      input: inputElement,
      error: errorMessages,
      success: successMessages,
    };
    validationFields.push(inputErrorPair);
  });

  // Prepare checkbox inputs
  checkboxFields.forEach((block) => {
    const errorMessages = queryElement('error-show', { scope: block });
    const successMessages = queryElement('success-show', { scope: block });
    const checkbox = block.querySelector('input[type="checkbox"]');

    const inputErrorPair = {
      input: checkbox,
      error: errorMessages,
      success: successMessages,
    };
    validationFields.push(inputErrorPair);
  });

  const validationType = getAttribute(form, 'validate');
  const validateOn = validationType ? validationType.split(',') : ['submit'];
  const debounce = getAttribute(form, 'debounce');

  const errorClasses = new Set<string>();

  /**
   * Hides error and success messages and removes error classes from input fields.
   */
  const clearValidation = () => {
    validationFields.forEach((field) => {
      if (field.error) field.error.style.display = 'none';
      if (field.success) field.success.style.display = 'none';

      const errorClass = field.input.getAttribute('errorclass');
      if (errorClass) errorClasses.add(errorClass);
      errorClasses.forEach((errorClass) => {
        field.input.classList.remove(errorClass);
      });
    });
  };

  clearValidation();

  requiredFields.forEach((field) => {
    pristine.addValidator(
      field,
      function (value: string) {
        return value !== '';
      },
      'This field is required.'
    );
  });

  minValueFields.forEach((field) => {
    const minValue = getAttribute(field, 'minvalue');
    pristine.addValidator(
      field,
      function (value: string) {
        return Number(value) >= Number(minValue);
      },
      `This value should be greater than or equal to ${minValue}.`
    );
  });

  maxValueFields.forEach((field) => {
    const maxValue = getAttribute(field, 'maxvalue');
    pristine.addValidator(
      field,
      function (value: string) {
        return Number(value) <= Number(maxValue);
      },
      `This value should be less than or equal to ${maxValue}.`
    );
  });

  minLengthFields.forEach((field) => {
    const minLength = getAttribute(field, 'minlength');
    pristine.addValidator(
      field,
      function (value: string) {
        return value.length >= Number(minLength);
      },
      `Please enter at least ${minLength} characters.`
    );
  });

  maxLengthFields.forEach((field) => {
    const maxLength = getAttribute(field, 'maxlength');
    pristine.addValidator(
      field,
      function (value: string) {
        return value.length <= Number(maxLength);
      },
      `Please enter at most ${maxLength} characters.`
    );
  });

  rejectFields.forEach((field) => {
    const reject = getAttribute(field, 'reject');
    const rejectWords = reject?.split(',');
    pristine.addValidator(
      field,
      function (value: string) {
        return !rejectWords?.some((word) => {
          const regex = new RegExp(`\\b${word}\\b`, 'i');
          return regex.test(value);
        });
      },
      `Please, provide different value.`
    );
  });

  checkboxFields.forEach((checkboxField) => {
    const minCheckbox = getAttribute(checkboxField, 'mincheckbox');
    const checkboxes = checkboxField.querySelectorAll('input[type="checkbox"]');
    if (checkboxField) {
      pristine.addValidator(
        checkboxes[0],
        function () {
          const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
          return checkedCheckboxes.length >= Number(minCheckbox);
        },
        `Please, select at least ${minCheckbox} checkboxes.`
      );
    }
  });

  const validate = () => {
    const valid = pristine.validate();

    if (!valid) {
      validationFields.forEach((field) => {
        const errors = pristine.getErrors(field.input);
        if (errors.length > 0) {
          const errorClass = field.input.getAttribute('errorclass');
          if (errorClass) {
            errorClasses.add(errorClass);
            field.input.classList.add(errorClass);
          }
          if (field.error) {
            field.error.style.display = 'block';
            const [firstError] = errors;
            field.error.innerHTML = firstError;
          }
        } else {
          if (field.error) field.error.style.display = 'none';
        }
      });
    } else {
      clearValidation();
      form.submit();
    }
  };

  const onSubmitButtonClick = (event: Event) => {
    event.preventDefault();
    validate();
  };

  if (validateOn.includes('typing')) {
    validationFields.forEach((field) => {
      field.input.addEventListener('input', () => {
        setTimeout(() => {
          validate();
        }, Number(debounce) || 0);
      });
    });
  }

  if (validateOn.includes('unfocus')) {
    validationFields.forEach((field) => {
      field.input.addEventListener('blur', validate);
    });
  }

  if (validateOn.includes('submit')) {
    submitButton.addEventListener('click', onSubmitButtonClick);
  }

  return {
    clean: () => {
      submitButton.removeEventListener('click', onSubmitButtonClick);
      validationFields.forEach((field) => {
        field.input.removeEventListener('typing', validate);
        field.input.removeEventListener('blur', validate);
      });
      pristine.destroy();
    },
  };
};
