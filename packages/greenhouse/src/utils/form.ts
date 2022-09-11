import { cloneNode, isFormField, isNotEmpty } from '@finsweet/ts-utils';
import slugify from 'slugify';

import type { FormTemplate } from '../types';

export interface InputOption {
  value: string | number;
  label: string;
  freeForm: boolean;
}

type InputOptions = InputOption[];

export function createInputHidden(name: string, value: string, templates: FormTemplate) {
  const { elements, form } = templates;
  const { input } = elements;
  const inputHidden = cloneNode(input);
  inputHidden.type = 'hidden';
  inputHidden.id = name;
  inputHidden.name = name;
  inputHidden.value = value;
  inputHidden.removeAttribute('data-name');
  inputHidden.removeAttribute('placeholder');

  form.append(inputHidden);
}

/**
 * Creates a new input.
 * @param inputTemplate
 */
export function createInputElement(
  wrapper: HTMLElement,
  inputTemplate: HTMLInputElement,
  type: 'text' | 'email' | 'file',
  name: string,
  labelId: string,
  required: boolean
) {
  const formField = cloneNode(inputTemplate);
  formField.type = type;

  if (!isFormField(formField)) {
    return undefined;
  }

  addElementAttributes(formField, name, labelId, required);

  wrapper.append(formField);

  return formField;
}

/**
 * Creates a new textarea element.
 * @param textAreaTemplate
 */
export function createTextAreaElement(
  wrapper: HTMLElement,
  textAreaTemplate: HTMLTextAreaElement,
  name: string,
  labelId: string,
  required: boolean
) {
  const formField = cloneNode(textAreaTemplate);

  if (!isFormField(formField)) {
    return undefined;
  }

  addElementAttributes(formField, name, labelId, required);

  wrapper.append(formField);
}

/**
 * Creates a single-select element.
 * @param selectTemplate
 * @param field
 */
export function createSingleSelectElement(
  wrapper: HTMLElement,
  selectTemplate: HTMLSelectElement,
  inputTemplate: HTMLInputElement | null,
  name: string,
  labelId: string,
  required: boolean,
  options: InputOptions
) {
  const formField = cloneNode(selectTemplate);

  formField.innerHTML = '';
  const defaultOptionElement = new Option('Select:', '');
  formField.appendChild(defaultOptionElement);

  const freeFormOptions: InputOptions = [];

  if (!options) return;
  options.forEach(({ label, value, freeForm }) => {
    const optionElement = new Option(label, value.toString());
    formField.appendChild(optionElement);

    if (freeForm) {
      freeFormOptions.push({ label, value, freeForm });
    }
  });

  if (!isFormField(formField)) {
    return undefined;
  }

  addElementAttributes(formField, name, labelId, required);

  wrapper.append(formField);

  if (freeFormOptions.length > 0) {
    freeFormOptions.forEach(({ value }) => {
      if (inputTemplate) {
        const freeInput = createInputElement(wrapper, inputTemplate, 'text', `${name}_${value}_input`, '', false);
        if (freeInput) {
          freeInput.style.display = 'none';
        }
      }
    });

    formField.addEventListener('change', (event) => {
      const { value } = event.target as HTMLInputElement;

      const input = document.querySelector<HTMLElement>(`[name="${name}_${value}_input"]`);

      if (!input) {
        return;
      }

      if (freeFormOptions.map((option) => option.value).includes(parseInt(value))) {
        input.style.display = 'block';
        return;
      }
      input.style.display = 'none';
    });
  }
}

/**
 * Creates a multi-select using checkboxes.
 * Ensures that at least one is required to be checked when the question is required.
 * @param checkboxTemplate
 * @param field
 * @param isRequired
 */
export function createMultiSelectElement(
  wrapper: HTMLElement,
  checkboxTemplate: HTMLLabelElement,
  inputTemplate: HTMLInputElement | null,
  name: string,
  required: boolean,
  options: InputOptions
) {
  const formField = document.createElement('fieldset');
  formField.innerHTML = '';
  const defaultOptionElement = new Option('Select:', '');
  formField.appendChild(defaultOptionElement);

  if (!options) return;

  const freeFormOptions: InputOptions = [];

  const checkboxes = options
    .map(({ label, value, freeForm }) => {
      const checkboxWrapper = cloneNode(checkboxTemplate);
      const checkboxLabel = checkboxWrapper.querySelector('span');
      const checkboxInput = checkboxWrapper.querySelector('input');
      if (!checkboxLabel || !checkboxInput) return;

      checkboxLabel.textContent = label;
      checkboxInput.name = name.replace(/[\])}[{(]/g, '');
      checkboxInput.value = value.toString();
      checkboxInput.required = required;

      formField.appendChild(checkboxWrapper);

      if (freeForm) {
        freeFormOptions.push({ label, value, freeForm });
      }

      return checkboxInput;
    })
    .filter(isNotEmpty);

  wrapper.append(formField);

  if (required) {
    formField.addEventListener('change', () => {
      const atLeastOneChecked = checkboxes.some(({ checked }) => checked);

      for (const checkbox of checkboxes) {
        checkbox.required = !atLeastOneChecked;
      }
    });
  }

  if (freeFormOptions.length > 0) {
    freeFormOptions.forEach(({ value }) => {
      if (inputTemplate) {
        const freeInput = createInputElement(wrapper, inputTemplate, 'text', `${name}_${value}_input`, '', false);
        if (freeInput) {
          freeInput.style.display = 'none';
        }
      }
    });
    formField.addEventListener('change', (event) => {
      const { value, checked } = event.target as HTMLInputElement;

      if (freeFormOptions.map((option) => option.value).includes(parseInt(value))) {
        const input = document.querySelector<HTMLElement>(`[name="${name}_${value}_input"]`);

        if (!input) {
          return;
        }

        if (checked) {
          input.style.display = 'block';
          return;
        }

        input.style.display = 'none';
      }
    });
  }
}

function addElementAttributes(
  formField: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  name: string,
  label: string,
  required: boolean
) {
  formField.name = name;
  formField.id = slugify(name, { strict: true, lower: true });
  formField.required = required;

  formField.setAttribute('aria-labelledby', label);
  formField.removeAttribute('data-name');
}
