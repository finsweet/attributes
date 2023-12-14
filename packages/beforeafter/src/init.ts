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
  const instances = beforeAfterWrappers.map((wrapper) => {
    const beforeElement = queryElement('before', { scope: wrapper });

    const afterElement = queryElement('after', { scope: wrapper });

    const handleElement = queryElement('handle', { scope: wrapper.parentElement ?? undefined }) ?? undefined;

    // whether to use drag or hover mode
    const mode = getAttribute(wrapper, 'mode', true);

    // if no before or after element, return
    if (!beforeElement || !afterElement) {
      return;
    }

    return createBeforeAfterInstance(wrapper, beforeElement, afterElement, handleElement, mode);
  });

  return {
    result: instances,
    destroy: () => {
      instances.forEach((instance) => {
        instance?.cleanups.forEach((cleanup) => cleanup());
      });
    },
  };
};
