import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { createBeforeAfterInstance } from './factory';
import { getAttribute, queryAllElements, queryElement } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const beforeAfterWrappers = queryAllElements('wrapper');

  //loop through all the wrappers and create an instance for each
  const instances = beforeAfterWrappers.forEach((wrapper) => {
    const modeOption: 'drag' | 'hover' | undefined = getAttribute(wrapper, 'mode');

    const beforeElement = queryElement('before', { scope: wrapper });

    const afterElement = queryElement('after', { scope: wrapper });

    const handleElement = queryElement('handle', { scope: wrapper.parentElement ?? undefined }) ?? undefined;

    if (!beforeElement || !afterElement) {
      return;
    }

    return createBeforeAfterInstance(wrapper, beforeElement, afterElement, handleElement, modeOption);
  });

  return {
    result: instances,
    destroy: () => {
      // handle destroy
    },
  };
};
