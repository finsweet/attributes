import type { ShopifyClient } from '../shopifyClient';
import {
  ATTRIBUTES,
  COLLECTION_ID_PREFIX,
  getSelector,
  LinkFormat,
  ProductSort,
  queryElement,
} from '../utils/constants';
import type { ProductOptions, ShopifyCollection, ShopifyProduct } from '../utils/types';
import { formatAttribute } from '../utils/util';
import { bindProductDataGraphQL } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  try {
    const collectionContainers = queryElement<HTMLDivElement>('productsList', {
      scope: document.body,
      all: true,
    });
    collectionContainers.forEach(async (container: HTMLDivElement) => {
      bindCollectionProductsData(client, container);
    });
  } catch (e) {
    console.log('productsPageInit', e);
  }
};

export const bindCollectionProductsData = async (
  client: ShopifyClient,
  container: HTMLDivElement
): Promise<ShopifyCollection | null> => {
  const selector = getSelector('collectionId');
  const { productPage } = client.getParams();
  // get first child as template
  const firstChild = container.firstElementChild as HTMLDivElement;
  // clone template
  const template = firstChild.cloneNode(true) as HTMLDivElement;
  // remove all children
  container.innerHTML = '';

  const collectionId = container.getAttribute(formatAttribute(selector)) as string;
  if (collectionId) {
    const productLimit = container.getAttribute(formatAttribute(getSelector('productLimit'))) || '10';

    const sortKey = container.getAttribute(formatAttribute(getSelector('productSort')));
    let productSort = ProductSort.POSITION;
    if (sortKey === ProductSort.MOST_RECENT) {
      productSort = ProductSort.MOST_RECENT;
    } else if (sortKey === ProductSort.OLDEST) {
      productSort = ProductSort.OLDEST;
    }

    const collection = await client.fetCollectionById(
      COLLECTION_ID_PREFIX + collectionId,
      Number(productLimit),
      productSort
    );
    const {
      products: { nodes: products },
    } = collection;
    bindProducts(products, template, container, { productPage: productPage as string });
    return Promise.resolve(collection);
  }
  return null;
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
    bindProductDataGraphQL(productContainer, product, productOptions);
    container.appendChild(productContainer);
  });
};
