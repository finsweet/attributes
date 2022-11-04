import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, FORM_SUBMIT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import type { Form } from './components/Form';
import { initFormInstance } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<Form[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const formElements = queryElement('form', { all: true, operator: 'prefixed' });

  const formInstances = formElements.map(initFormInstance).filter(isNotEmpty);

  return finalizeAttribute(FORM_SUBMIT_ATTRIBUTE, formInstances, () => {
    for (const formInstance of formInstances) {
      formInstance.destroy();
    }
  });
};
