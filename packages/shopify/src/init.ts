/* eslint-disable no-console */
import { type FsAttributeInit, waitDOMReady } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { SETTINGS } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async (settings) => {
  // TODO: remove console.logs
  console.log('shopify attribute initializing with settings: ', settings);

  if (!settings?.token) {
    throw new Error('Shopify storefront token must be provided');
  }
  if (!settings?.domain) {
    throw new Error('Shopify storefront domain must be provided');
  }

  const client = await initializeClient({
    token: settings.token,
    domain: settings.domain,
    productPage: settings.productPage || SETTINGS.productPage.values.default,
    collectionPage: settings.collectionPage || SETTINGS.collectionPage.values.default,
    redirectURL: settings.redirectURL || SETTINGS.redirectURL.values.default,
  });

  await waitDOMReady();

  console.log('DOM is ready, initializing shopify pages...');

  await initPages(client);

  hideLoaders();

  console.log('shopify attribute initialized');

  return {
    result: client,
    destroy() {
      // Nothing to destroy.
      return;
    },
  };
};
