import { assessScript } from '@global/factory';

import { initializeShopifyClient } from './actions/shopifyClient';
import { ATTRIBUTES } from './utils/constants';
import type { ShopifyAttributeParams } from './utils/types';

/**
 * Inits the attribute.
 */
export const init = (params: ShopifyAttributeParams) => {
  return (): void => {
    initializeShopifyClient(params);
  };
};

/**
 * Checks the Shopify params of the Attribute `<script>`.
 * @returns The {@link ShopifyAttributeParams}.
 */

export const assessScriptAttributes = (): ShopifyAttributeParams => {
  const { currentScript } = document;
  const globalAttributeParams = assessScript();
  const { token, domain, productPage, redirectURL } = ATTRIBUTES;

  const tokenValue = currentScript?.getAttribute(token.key);
  if (!tokenValue) {
    throw new Error('token must be provided');
  }

  const domainValue = currentScript?.getAttribute(domain.key);
  if (!domainValue) {
    throw new Error('domain must be provided');
  }

  const productPageValue = currentScript?.getAttribute(productPage.key) || productPage.defaultValue;

  const redirectURLValue = currentScript?.getAttribute(redirectURL.key) || redirectURL.defaultValue;

  return {
    globalAttributeParams,
    domain: domainValue,
    token: tokenValue,
    productPage: productPageValue,
    redirectURL: redirectURLValue,
  };
};
