import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initFormInstance } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const formElements = queryAllElements('form');

  const formInstances = formElements.map(initFormInstance).filter(isNotEmpty);

  return {
    result: formInstances,
    destroy() {
      for (const formInstance of formInstances) {
        formInstance.destroy();
      }
    },
  };
};
