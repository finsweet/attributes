import type { ShopifyClient } from '../shopifyClient';
import { getSelector, Sort, queryElement, DEFAULT_COLLECTIONS_LIMIT } from '../utils/constants';
import { formatAttribute } from '../utils/util';
import { bindCollectionData } from './collectionPage';
import { handleCollectionLink } from './util';

export const collectionsPageInit = async (client: ShopifyClient) => {
  const { collectionPage, productPage } = client.getParams();
  try {
    const collectionContainers = queryElement<HTMLDivElement>('collectionsList', {
      scope: document.body,
      all: true,
    });

    collectionContainers.forEach(async (container: HTMLDivElement) => {
      const collectionsLimit =
        container.getAttribute(formatAttribute(getSelector('collectionLimit'))) || DEFAULT_COLLECTIONS_LIMIT;
      const sortKey = container.getAttribute(formatAttribute(getSelector('sort')));
      let collectionSort = Sort.POSITION;
      if (sortKey === Sort.MOST_RECENT) {
        collectionSort = Sort.MOST_RECENT;
      } else if (sortKey === Sort.OLDEST) {
        collectionSort = Sort.OLDEST;
      }

      const collections = await client.fetchAllCollections(Number(collectionsLimit), collectionSort);

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
    });
  } catch (e) {
    console.log('productsPageInit', e);
  }
};
