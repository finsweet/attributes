import { type FsAttributeInit, isNotEmpty, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

import { initWhatsappInstance } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // wait for cms to load if it's present
  await waitAttributeLoaded('cmsload');

  // Get all whatsapp buttons on the page
  const buttonElements = queryAllElements('button');

  // Create instances of each whatsapp button
  buttonElements.map(initWhatsappInstance).filter(isNotEmpty);

  return {
    result: buttonElements,
    destroy() {
      return;
    },
  };
};
