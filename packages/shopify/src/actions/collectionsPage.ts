import type { ShopifyCollection } from '$packages/shopify/src/utils/types';

import type { ShopifyClient } from '../shopifyClient';
import { DEFAULT_COLLECTIONS_LIMIT, getAttribute, queryElement, sortOptions } from '../utils/constants';
import { bindCollectionData } from './collectionPage';
import { handleCollectionLink } from './util';

export const collectionsPageInit = async (client: ShopifyClient) => {
  const { collectionPage, productPage } = client.getParams();
  const collectionContainers = queryElement<HTMLDivElement>('collectionsList', {
    all: true,
  });

  for (const container of collectionContainers) {
    const collectionsLimit = getAttribute(container, 'collectionLimit') || DEFAULT_COLLECTIONS_LIMIT;
    const sortKey = getAttribute(container, 'sort') as string;
    const collectionSort = sortOptions[sortKey] || sortOptions.position;

    let collections: ShopifyCollection[];
    try {
      collections = await client.fetchAllCollections(Number(collectionsLimit), collectionSort);
    } catch (e) {
      console.log('productsPageInit', e);
      return;
    }

    // get first child as template
    const firstChild = container.firstElementChild as HTMLDivElement;
    // clone template
    const template = firstChild.cloneNode(true) as HTMLDivElement;
    // remove all children
    container.innerHTML = '';

    collections.forEach((collection) => {
      const collectionContainer = template.cloneNode(true) as HTMLDivElement;
      bindCollectionData(collection, collectionContainer);
      handleCollectionLink(collectionContainer, {
        productOptions: {
          collectionId: collection.id,
          collectionHandle: collection.handle,
          collectionPage: collectionPage as string,
          productPage: productPage as string,
        },
      });
      container.appendChild(collectionContainer);
    });
  }
};
