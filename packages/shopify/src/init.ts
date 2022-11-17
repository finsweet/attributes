import { CMS_ATTRIBUTE_ATTRIBUTE, SHOPIFY_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initPages } from './factory';
import { ATTRIBUTES } from './utils/constants';
import type { ShopifyAttributeParams } from './utils/types';

/**
 * Inits the attribute.
 */
export const init = async (params: ShopifyAttributeParams) => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const { token, domain, productPage, collectionPage, redirectURL } = params;
  if (!token) {
    throw new Error('token must be provided');
  }
  if (!domain) {
    throw new Error('domain must be provided');
  }

  const client = await initializeClient({
    token,
    domain,
    productPage: productPage || ATTRIBUTES.productPage.defaultValue,
    collectionPage: collectionPage || ATTRIBUTES.collectionPage.defaultValue,
    redirectURL: redirectURL || ATTRIBUTES.redirectURL.defaultValue,
  });

  await initPages(client);

  hideLoaders();

  return finalizeAttribute(SHOPIFY_ATTRIBUTE, client);
};
