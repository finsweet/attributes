import { type FsAttributeInit } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { SETTINGS } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async (settings) => {
  console.log('shopify attribute initializing...');

  if (!settings?.token) {
    throw new Error('token must be provided');
  }
  if (!settings?.domain) {
    throw new Error('domain must be provided');
  }

  const client = await initializeClient({
    token: settings.token,
    domain: settings.domain,
    productPage: settings.productPage || SETTINGS.productPage.values.default,
    collectionPage: settings.collectionPage || SETTINGS.collectionPage.values.default,
    redirectURL: settings.redirectURL || SETTINGS.redirectURL.values.default,
  });

  await initPages(client);

  hideLoaders();

  return {
    result: client,
    destroy() {
      // Nothing to destroy.
      return;
    },
  };
};
