import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initTyping } from './actions/typing';
import { queryAllElements } from './utils';
import { typingInstancesStore } from './utils';

/**
 * Inits the typing attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const textElements = queryAllElements<HTMLElement>('text');

  textElements.forEach((element) => initTyping(element));

  return {
    result: typingInstancesStore,
    destroy() {
      for (const [, typeInstance] of typingInstancesStore) {
        typeInstance.destroy();
      }

      typingInstancesStore.clear();
    },
  };
};
