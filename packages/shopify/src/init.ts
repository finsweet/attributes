import { type FsAttributeInit } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { SETTINGS } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  console.log('shopify attribute initializing...');

  if (!SETTINGS.token) {
    throw new Error('token must be provided');
  }
  if (!SETTINGS.domain) {
    throw new Error('domain must be provided');
  }

  const client = await initializeClient({
    token: SETTINGS.token.key,
    domain: SETTINGS.domain.key,
    productPage: SETTINGS.productPage.key || SETTINGS.productPage.values.default,
    collectionPage: SETTINGS.collectionPage.key || SETTINGS.collectionPage.values.default,
    redirectURL: SETTINGS.redirectURL.key || SETTINGS.redirectURL.values.default,
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
