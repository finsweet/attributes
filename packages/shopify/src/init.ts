import { assessScript } from '$global/factory/assess';

import { logHello } from './actions/console';
import { ATTRIBUTES } from './utils/constants';
import { ShopifyAttributeParams } from './utils/types';

/**
 * Inits the attribute.
 */
export const init = (): void => {
  logHello();
};

/**
 * Checks the Shopify params of the Attribute `<script>`.
 * @returns The {@link ShopifyAttributeParams}.
 */

export const assessScriptAttributes = (): ShopifyAttributeParams => {
  const { currentScript } = document;
  const globalAttributeParams = assessScript();
  const { token, domain } = ATTRIBUTES;

  const tokenValue = currentScript?.getAttribute(token.key);
  if (!tokenValue) {
    throw new Error('token must be provided');
  }

  const domainValue = currentScript?.getAttribute(domain.key);
  if (!domainValue) {
    throw new Error('domain must be provided');
  }

  return { globalAttributeParams, domain: domainValue, token: tokenValue };
};
