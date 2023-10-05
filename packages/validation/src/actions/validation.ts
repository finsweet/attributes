// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Pristine from 'pristinejs';

import { getAttribute, getSettingSelector, queryAllElements, queryElement } from '../utils';

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

  const inputFields = form.querySelectorAll('input, textarea');

  const requiredFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('required'));
  const minValueFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('minvalue'));
  const maxValueFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('maxvalue'));
  const minLengthFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('minlength'));
  const maxLengthFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('maxlength'));
  const checkboxFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('mincheckbox'));
  const rejectFields = form.querySelectorAll<HTMLInputElement>(getSettingSelector('reject'));

  const errorMessages = queryAllElements('error-show', { scope: form });
  const successMessages = queryAllElements('success-show', { scope: form });
  const validationType = getAttribute(form, 'validate');
  const validateOn = validationType ? validationType.split(',') : ['submit'];
  const debounce = getAttribute(form, 'debounce');

  const errorClasses = new Set<string>();

  /**
   * Hides error messages and removes error classes from input fields.
   */
  const hideErrors = () => {
    errorMessages.forEach((element) => {
      element.style.display = 'none';
    });

    successMessages.forEach((element) => {
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
      function (value) {
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
    const rejectWords = reject.split(',');
    pristine.addValidator(
      field,
      function (value: string) {
        return rejectWords.includes(value);
      },
      `Please, provide different value.`
    );
  });

  checkboxFields.forEach((block) => {
    const minCheckbox = getAttribute(block, 'mincheckbox');
    const checkboxes = block.querySelectorAll('input[type="checkbox"]');
    pristine.addValidator(
      block,
      function () {
        const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
        return checkedCheckboxes.length >= Number(minCheckbox);
      },
      `Please, select at least ${minCheckbox} checkboxes.`
    );
  });

  const validate = () => {
    const valid = pristine.validate();

    if (!valid) {
      inputFields.forEach((field, index) => {
        const errors = pristine.getErrors(field);
        if (errors.length > 0) {
          const errorClass = field.getAttribute('errorclass');
          if (errorClass) {
            errorClasses.add(errorClass);
            field.classList.add(errorClass);
          }
          errorMessages[index].style.display = 'block';
          const [firstError] = errors;
          errorMessages[index].innerHTML = firstError;
        } else {
          errorMessages[index].style.display = 'none';
        }
      });
    } else {
      hideErrors();
    }
  };

  const onSubmitButtonClick = (event: Event) => {
    event.preventDefault();
    validate();
  };

  if (validateOn.includes('typing')) {
    inputFields.forEach((field) => {
      field.addEventListener('input', () => {
        setTimeout(() => {
          validate();
        }, debounce || 0);
      });
    });
  }

  if (validateOn.includes('unfocus')) {
    inputFields.forEach((field) => {
      field.addEventListener('blur', validate);
    });
  }

  if (validateOn.includes('submit')) {
    submitButton.addEventListener('click', onSubmitButtonClick);
  }

  return {
    clean: () => {
      submitButton.removeEventListener('click', onSubmitButtonClick);
      inputFields.forEach((field) => {
        field.removeEventListener('typing', validate);
        field.removeEventListener('blur', validate);
      });
      pristine.destroy();
    },
  };
};
