import Client, { Product } from 'shopify-buy';

import { ShopifyAttributeParams } from '../utils/types';

export const initializeShopifyClient = (params: ShopifyAttributeParams) => {
  const { token, domain } = params;
  const client = Client.buildClient({
    domain: domain,
    storefrontAccessToken: token,
  });

  client.product.fetchAll().then((products: Product[]) => {
    // Do something with the products
    // eslint-disable-next-line no-console
    console.log(products);
  });
};
