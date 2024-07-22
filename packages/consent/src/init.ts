import { type FinsweetAttributeInit, waitDOMReady } from '@finsweet/attributes-utils';

import FsCookieConsent from './FsCookieConsent';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  // Init library
  const instance = new FsCookieConsent();

  await waitDOMReady();

  return {
    result: instance,
  };
};
