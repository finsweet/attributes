import type { ShopifyClient } from '../shopifyClient';
import {
  ATTRIBUTES,
  COLLECTION_ID_PREFIX,
  DEFAULT_PRODUCTS_LIMIT,
  getAttribute,
  getSelector,
  LinkFormat,
  queryElement,
  sortOptions,
} from '../utils/constants';
import type {
  ShopifyBindingOptions,
  ShopifyCollection,
  ShopifyCollectionWithProducts,
  ShopifyProduct,
} from '../utils/types';
import { bindProductDataGraphQL } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  try {
    const collectionContainers = queryElement<HTMLDivElement>('productsList', {
      all: true,
    });
    await Promise.all(collectionContainers.map((container) => bindCollectionProductsData(client, container)));
  } catch (e) {
    console.log('productsPageInit', e);
  }
};

export const bindCollectionProductsData = async (
  client: ShopifyClient,
  container: HTMLDivElement,
  collectionHandle?: string
): Promise<ShopifyCollection | null> => {
  const selector = getSelector('collectionId');
  const { productPage, collectionPage } = client.getParams();
  // get first child as template
  const firstChild = container.firstElementChild as HTMLDivElement;
  // clone template
  const template = firstChild.cloneNode(true) as HTMLDivElement;
  // remove all children
  container.innerHTML = '';

  const collectionId = getAttribute(container, 'collectionId') as string;
  const productLimit = getAttribute(container, 'productLimit') || DEFAULT_PRODUCTS_LIMIT;

  const sortKey = getAttribute(container, 'sort') as string;
  const productSort = sortOptions[sortKey] || sortOptions.position;

  let collection: ShopifyCollectionWithProducts;
  if (collectionHandle) {
    collection = await client.fetchCollectionByHandle(collectionHandle, Number(productLimit), productSort);
  } else if (collectionId) {
    collection = await client.fetchCollectionById(
      COLLECTION_ID_PREFIX + collectionId,
      Number(productLimit),
      productSort
    );
  } else {
    return null;
  }

  const {
    products: { nodes: products },
  } = collection;
  bindProducts(products, template, container, {
    productPage: productPage as string,
    collectionPage: collectionPage as string,
    collectionId,
    collectionHandle: collection.handle,
    collectionName: collection.title,
  });
  return Promise.resolve(collection);
};

/**
 * Bind products to container
 * @param products array of products
 * @param template template to clone
 * @param container container to append products
 * @param productOptions product options
 */
export const bindProducts = (
  products: ShopifyProduct[],
  template: HTMLDivElement,
  container: HTMLDivElement,
  productOptions: ShopifyBindingOptions
) => {
  const linkFormat = container.getAttribute(ATTRIBUTES.linkFormat.key) as string;
  const options = productOptions;
  if (linkFormat) {
    options.linkFormat = linkFormat as LinkFormat;
  }
  products.forEach((product) => {
    const productContainer = template.cloneNode(true) as HTMLDivElement;
    bindProductDataGraphQL(productContainer, product, options);
    container.appendChild(productContainer);
  });
};
