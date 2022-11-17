import { collectionPageInit } from './actions/collectionPage';
import { productPageInit } from './actions/productPage';
import { productsPageInit } from './actions/productsPage';
import type { ShopifyClient } from './shopifyClient';

export const initPages = async (client: ShopifyClient) => {
  const { productPage, collectionPage } = client.getParams();

  const path = window.location.pathname;
  if (path.endsWith(productPage as string)) {
    await productPageInit(client);
    return;
  }
  if (path.endsWith(collectionPage as string)) {
    collectionPageInit(client);
    return;
  }

  await productsPageInit(client);
};
