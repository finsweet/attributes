import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initFormValidation } from './actions/validation';
import { queryAllElements } from './utils';

/**
 * Inits the validation attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const forms = queryAllElements('form');

  const formInstances = forms.map((wrapper) => initFormValidation(wrapper));

  return {
    result: forms,
    destroy() {
      for (const formInstance of formInstances) formInstance?.clean();
    },
  };
};
