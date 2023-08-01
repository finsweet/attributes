import { type FsAttributeInit, waitDOMReady } from '@finsweet/attributes-utils';

import FsCookieConsent from './FsCookieConsent';
import { SETTINGS } from './utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  const url = new URL(window.location.href);

  const debug = url.search.includes('debugger') && url.origin.includes('webflow.io');
  // Init library
  const instance = new FsCookieConsent({ ...globalSettings, debug });

  await waitDOMReady();

  return {
    result: instance,
  };
};
