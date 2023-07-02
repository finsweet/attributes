import { type FsAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

import { observeAriaControls } from './actions/aria-controls';
import { handleKeyboardEvents } from './actions/keyboard';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  await waitAttributeLoaded('modal');
  await waitAttributeLoaded('inputcounter');
  await waitAttributeLoaded('accordion');

  const keyboardCleanup = handleKeyboardEvents();
  const observersCleanup = observeAriaControls();

  return {
    destroy() {
      keyboardCleanup();
      observersCleanup();
    },
  };
};
