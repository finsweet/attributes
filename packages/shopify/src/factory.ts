import { collectionPageInit } from './actions/collectionPage';
import { collectionsPageInit } from './actions/collectionsPage';
import { productPageInit } from './actions/productPage';
import { productsPageInit } from './actions/productsPage';
import type { ShopifyClient } from './shopifyClient';
import type { GlobalSettings } from './utils/types';

export const initPages = async (client: ShopifyClient, globalSettings: GlobalSettings) => {
  const { productPage, collectionPage } = client.getParams();

  const path = window.location.pathname;
  if (path.endsWith(productPage as string)) {
    await productPageInit(client, globalSettings);
    return;
  }
  if (path.endsWith(collectionPage as string)) {
    await collectionPageInit(client, globalSettings);
    return;
  }

  await productsPageInit(client, globalSettings);
  await collectionsPageInit(client, globalSettings);
};
