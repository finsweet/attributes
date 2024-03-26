import { type FsAttributeInit, waitDOMReady } from '@finsweet/attributes-utils';

import FsCookieConsent from './FsCookieConsent';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  // Init library
  const instance = new FsCookieConsent();

  await waitDOMReady();

  return {
    result: instance,
  };
};
