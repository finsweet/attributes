import type { ShopifyClient } from '../shopifyClient';
import { COLLECTION_ID_PREFIX, getSelector } from '../utils/constants';
import { bindProductDataGraphQL } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  try {
    let selector = getSelector('collectionId');
    const collectionContainers = [...document.querySelectorAll<HTMLDivElement>(`div${selector}`)];
    collectionContainers.forEach(async (container: HTMLDivElement) => {

      // get first child as template
      const firstChild = container.firstElementChild as HTMLDivElement;
      // clone template
      const template = firstChild.cloneNode(true) as HTMLDivElement;
      // remove all children
      container.innerHTML = '';

      const collectionId = container.getAttribute(selector.replace(/(\[|\])/g, ''));
      const productLimit = container.getAttribute(getSelector('productLimit').replace(/(\[|\])/g, '')) || "10";

      if (collectionId) {
        const collection = await client.fetCollectionById(COLLECTION_ID_PREFIX + collectionId, Number(productLimit));
        const {
          products: { nodes: products },
        } = collection;
        products.forEach((product) => {
          const productContainer = template.cloneNode(true) as HTMLDivElement;
          container.appendChild(productContainer);
          bindProductDataGraphQL(productContainer, product);
        });
      }
    });
  } catch (e) {
    console.log('productsPageInit', e);
  }
};
