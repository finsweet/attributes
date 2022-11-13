import type { ShopifyClient } from '../shopifyClient';
import { ATTRIBUTES, COLLECTION_ID_PREFIX, getSelector, LinkFormat, ProductSort } from '../utils/constants';
import type { ProductOptions, ShopifyProduct } from '../utils/types';
import { formatAttribute } from '../utils/util';
import { bindProductDataGraphQL } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  const { productPage } = client.getParams();
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

      const collectionId = container.getAttribute(formatAttribute(selector));
      const productLimit = container.getAttribute(formatAttribute(getSelector('productLimit'))) || '10';

      const sortKey = container.getAttribute(formatAttribute(getSelector('productSort')));
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
        bindProducts(products, template, container, { productPage: productPage as string });
      }
    });
  } catch (e) {
    console.log('productsPageInit', e);
  }
};

export const bindProducts = (
  products: ShopifyProduct[],
  template: HTMLDivElement,
  container: HTMLDivElement,
  productOptions: ProductOptions
) => {
  const linkFormat = container.getAttribute(ATTRIBUTES.linkFormat.key) as string;
  const options = productOptions;
  if (linkFormat) {
    options.linkFormat = linkFormat as LinkFormat;
  }
  products.forEach((product) => {
    const productContainer = template.cloneNode(true) as HTMLDivElement;
    container.appendChild(productContainer);
    bindProductDataGraphQL(productContainer, product, productOptions);
  });
};
