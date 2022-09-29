import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, FORM_SUBMIT_ATTRIBUTE } from '$global/constants/attributes';

import type { Form } from './components/Form';
import { initFormInstance } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<Form[]> => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  const formElements = [
    ...queryElement('form', {
      all: true,
      operator: 'prefixed',
    }),
  ];

  const formInstances = formElements.map(initFormInstance).filter(isNotEmpty);

  window.fsAttributes[FORM_SUBMIT_ATTRIBUTE].resolve?.(formInstances);

  return formInstances;
};
