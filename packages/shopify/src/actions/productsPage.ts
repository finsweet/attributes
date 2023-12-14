import type { ShopifyClient } from '../shopifyClient';
import { COLLECTION_ID_PREFIX, DEFAULT_PRODUCTS_LIMIT, LinkFormat, sortOptions } from '../utils/constants';
import { getAttribute, queryAllElements } from '../utils/selectors';
import type {
  ShopifyBindingOptions,
  ShopifyCollection,
  ShopifyCollectionWithProducts,
  ShopifyProduct,
} from '../utils/types';
import { bindCollectionData } from './collectionPage';
import { bindProductVariant } from './product';

export const productsPageInit = async (client: ShopifyClient) => {
  try {
    const collectionContainers = queryAllElements<HTMLDivElement>('productsList');
    await Promise.all(collectionContainers.map((container) => bindCollectionProductsData(client, container)));
  } catch (e) {
    console.log('productsPageInit', e);
  }
};

export const bindCollectionProductsData = async (
  client: ShopifyClient,
  productListContainer: HTMLDivElement,
  collectionHandle?: string,
  collectionContainer?: HTMLElement
): Promise<ShopifyCollection | null> => {
  // TODO: is this selector below being used?
  // const selector = getSelector('collectionId');
  const { productPage, collectionPage } = client.getParams();
  // get first child as template
  const firstChild = productListContainer.firstElementChild as HTMLDivElement;
  // clone template
  const template = firstChild.cloneNode(true) as HTMLDivElement;
  // remove all children
  productListContainer.innerHTML = '';

  const collectionId = getAttribute(productListContainer, 'collectionid') as string;
  const productLimit = getAttribute(productListContainer, 'productLimit') || DEFAULT_PRODUCTS_LIMIT;

  const sortKey = getAttribute(productListContainer, 'sort');
  const productSort = sortKey ? sortOptions[sortKey] : sortOptions.position;

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
  if (collectionContainer) {
    bindCollectionData(collection, document.body);
  }

  const {
    products: { nodes: products },
  } = collection;
  bindProducts(products, template, productListContainer, {
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
  const linkFormat = getAttribute(container, 'linkFormat');
  const options = productOptions;
  if (linkFormat) {
    options.linkFormat = linkFormat as LinkFormat;
  }
  products.forEach((product) => {
    const productContainer = template.cloneNode(true);
    if (!productContainer) {
      return;
    }
    container.appendChild(productContainer);
    bindProductVariant(productContainer as HTMLElement, product, product.variants.nodes[0], options);
  });
};
