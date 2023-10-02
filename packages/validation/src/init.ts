import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initFormValidation } from './actions/validation';
import { queryAllElements } from './utils';

/**
 * Inits the validation attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const tabs = queryAllElements('form');

  const formInstances = tabs.map((wrapper) => initFormValidation(wrapper));

  return {
    result: tabs,
    destroy() {
      for (const formInstance of formInstances) formInstance?.clean();
    },
  };
};
