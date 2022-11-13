import type { ShopifyClient } from '../shopifyClient';
import { COLLECTION_ID_PREFIX, getSelector, ProductSort } from '../utils/constants';
import type { ShopifyProduct } from '../utils/types';
import { bindProductDataGraphQL } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  try {
    const selector = getSelector('collectionId');
    const collectionContainers = [...document.querySelectorAll<HTMLDivElement>(`div${selector}`)];
    collectionContainers.forEach(async (container: HTMLDivElement) => {
      // get first child as template
      const firstChild = container.firstElementChild as HTMLDivElement;
      // clone template
      const template = firstChild.cloneNode(true) as HTMLDivElement;
      // remove all children
      container.innerHTML = '';

      const collectionId = container.getAttribute(selector.replace(/(\[|\])/g, ''));
      const productLimit = container.getAttribute(getSelector('productLimit').replace(/(\[|\])/g, '')) || '10';

      const sortKey = container.getAttribute(getSelector('productSort').replace(/(\[|\])/g, ''));
      let productSort = ProductSort.POSITION;
      if (sortKey === 'most-recent') {
        productSort = ProductSort.MOST_RECENT;
      } else if (sortKey === 'oldest') {
        productSort = ProductSort.OLDEST;
      }

      if (collectionId) {
        const collection = await client.fetCollectionById(
          COLLECTION_ID_PREFIX + collectionId,
          Number(productLimit),
          productSort
        );
        const {
          products: { nodes: products },
        } = collection;
        bindProducts(products, template, container);
      }
    });
  } catch (e) {
    console.log('productsPageInit', e);
  }
};

export const bindProducts = (products: ShopifyProduct[], template: HTMLDivElement, container: HTMLDivElement) => {
  products.forEach((product) => {
    const productContainer = template.cloneNode(true) as HTMLDivElement;
    container.appendChild(productContainer);
    bindProductDataGraphQL(productContainer, product);
  });
};
