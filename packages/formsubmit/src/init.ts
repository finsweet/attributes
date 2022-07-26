import { isNotEmpty } from '@finsweet/ts-utils';
import { FORM_SUBMIT_ATTRIBUTE } from '@global/constants/attributes';

import type { Form } from './components/Form';
import { initFormInstance } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = (): Form[] => {
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
