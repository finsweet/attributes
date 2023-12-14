/* eslint-disable no-console */
import { type FsAttributeInit, waitDOMReady } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { SETTINGS } from './utils/constants';
import type { GlobalSettings } from './utils/types';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit<typeof SETTINGS> = async (globalSettings = {}) => {
  // TODO: remove console.logs

  if (!globalSettings?.token) {
    throw new Error('Shopify storefront token must be provided');
  }
  if (!globalSettings?.domain) {
    throw new Error('Shopify storefront domain must be provided');
  }

  const client = await initializeClient({
    token: globalSettings.token,
    domain: globalSettings.domain,
    productPage: globalSettings.productPage || SETTINGS.productPage.values.default,
    collectionPage: globalSettings.collectionPage || SETTINGS.collectionPage.values.default,
    redirectURL: globalSettings.redirectURL || SETTINGS.redirectURL.values.default,
  });

  await waitDOMReady();

  console.log('DOM is ready, initializing shopify pages...');

  const linkFormat = globalSettings.linkformat || 'handle';

  const settings = {
    ...globalSettings,
    linkformat: linkFormat,
  } as GlobalSettings;

  await initPages(client, settings);

  hideLoaders();

  console.log('shopify attribute initialized with global settings:', settings);

  return {
    result: client,
    destroy() {
      // Nothing to destroy.
      return;
    },
  };
};
