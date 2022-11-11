import { productPagInit } from './actions/productPage';
import type { ShopifyClient } from './shopifyClient';

export const initPages = async (client: ShopifyClient) => {
  const { productPage } = client.getParams();

  const path = window.location.pathname;
  if (path.endsWith(productPage!)) {
    await productPagInit(client);
    return;
  }
};
