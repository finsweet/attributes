import { isNotEmpty } from '@finsweet/ts-utils';

import type { Form } from './components/Form';
import { initFormInstance } from './factory';
import { ATTRIBUTE, queryElement } from './utils/constants';

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

  window.fsAttributes[ATTRIBUTE].resolve?.(formInstances);

  return formInstances;
};
