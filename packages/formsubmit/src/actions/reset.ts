import { FormField, isHTMLInputElement } from '@finsweet/ts-utils';

import type { Form } from '../components/Form';
import { getSelector } from '../utils/constants';
import type { FieldData } from '../utils/types';

/**
 * Resets a Webflow form and sets it back to visibile.
 * @param formInstance
 */
export const resetForm = ({ form, successMessage, errorMessage }: Form, preventResetFields: FieldData[] = []) => {
  form.reset();

  for (const { element, value, checked } of preventResetFields) {
    element.value = value;
    if (isHTMLInputElement(element) && checked) element.checked = checked;
  }

  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  form.style.display = '';
};

/**
 * Collects the data from all the fields that should not be resetted.
 * @param form
 * @returns An array of {@link FormData}.
 */
export const collectPreventResetFields = (form: HTMLFormElement) => {
  const fields = [...form.querySelectorAll<FormField>('input, select, textarea')];

  const fieldsData = fields.reduce<FieldData[]>((acc, element) => {
    const shouldPreventReset = element.closest(getSelector('preventReset'));
    if (!shouldPreventReset) return acc;

    const { value } = element;
    const checked = isHTMLInputElement(element) ? element.checked : undefined;

    acc.push({
      element,
      value,
      checked,
    });

    return acc;
  }, []);

  return fieldsData;
};
