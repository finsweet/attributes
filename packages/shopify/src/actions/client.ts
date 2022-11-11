import { ShopifyClient } from '../shopifyClient';
import type { ShopifyAttributeParams } from '../utils/types';

/**
 *
 * @param params is the shopify attribute params
 * @returns shopify client for making requests to shopify
 */
export const initializeClient = async (params: ShopifyAttributeParams): Promise<ShopifyClient> => {
  return new ShopifyClient(params);
};
