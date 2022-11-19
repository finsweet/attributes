import { generateSelectors } from '$global/factory';

export const ATTRIBUTE = 'shopify';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

/**
 * Products
 */

export const PRODUCT_CREATED = 'created';
export const PRODUCT_PUBLISHED = 'published';
export const IMAGE = 'image';
export const PRODUCT_THUMBNAIL = 'thumbnail';
export const PRODUCT_SKU = 'sku';
export const PRODUCT_PRICE = 'price';
export const PRODUCT_COMPARE_PRICE = 'compareprice';
export const PRODUCT_DISCOUNTED_PERCENT = 'discountpercent';
export const PRODUCT_DISCOUNTED_VALUE = 'discountvalue';
export const PRODUCT_TYPE = 'type';
export const PRODUCT_VENDOR = 'vendor';
export const PRODUCT_WEIGHT = 'weight';
export const PRODUCT_WEIGHT_UNIT = 'weightunit';
export const PRODUCT_TAG_LIST = 'tag-list';
export const PRODUCT_TAG_TEMPLATE = 'tag-template';
export const PRODUCT_TAG_TEXT = 'tag-text';
export const PRODUCTS_LIST = 'products-list';
export const PRODUCTS_COLLECTION = 'collection';

/**
 * Others
 */
export const LOADER = 'loader';
export const LINK_FORMAT = 'linkformat';
export const LINK = 'link';
export const PRODUCTS = 'products';
export const ID = 'id';
export const TITLE = 'title';
export const DESCRIPTION = 'description';
export const HANDLE = 'handle';
export const UPDATED = 'updated';

/**
 * Collections
 */
export const COLLECTION_CREATED = 'created';
export const COLLECTION_IMAGE = 'image';
export const COLLECTION_ID = 'collectionid';
export const COLLECTION_PRODUCT_LIMIT = 'productlimit';
export const COLLECTIONS_LIMIT = 'collectionlimit';
export const COLLECTION_PRODUCT_SORT = 'sort';
export const COLLECTIONS_LIST = 'collections-list';
export const DEFAULT_PRODUCTS_LIMIT = '10';
export const DEFAULT_COLLECTIONS_LIMIT = '10';

export const PRODUCT_ID_PREFIX = 'gid://shopify/Product/';
export const COLLECTION_ID_PREFIX = 'gid://shopify/Collection/';

export const productAttributes = [
  TITLE,
  DESCRIPTION,
  HANDLE,
  PRODUCT_CREATED,
  UPDATED,
  PRODUCT_PUBLISHED,
  IMAGE,
  PRODUCT_THUMBNAIL,
  PRODUCT_SKU,
  PRODUCT_PRICE,
  PRODUCT_COMPARE_PRICE,
  PRODUCT_DISCOUNTED_PERCENT,
  PRODUCT_TYPE,
  PRODUCT_VENDOR,
  PRODUCT_WEIGHT,
  PRODUCT_WEIGHT_UNIT,
  PRODUCT_TAG_LIST,
  PRODUCTS_COLLECTION,
];

export const collectionAttributes = [ID, TITLE, DESCRIPTION, HANDLE, IMAGE, UPDATED];

export const QUERY_PARAMS = {
  id: 'id',
  handle: 'handle',
};

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      id: ID,
      title: TITLE,
      description: DESCRIPTION,
      handle: HANDLE,
      created: PRODUCT_CREATED,
      updated: UPDATED,
      published: PRODUCT_PUBLISHED,
      image: IMAGE,
      thumbnail: PRODUCT_THUMBNAIL,
      sku: PRODUCT_SKU,
      price: PRODUCT_PRICE,
      compareprice: PRODUCT_COMPARE_PRICE,
      discountpercent: PRODUCT_DISCOUNTED_PERCENT,
      type: PRODUCT_TYPE,
      vendor: PRODUCT_VENDOR,
      weight: PRODUCT_WEIGHT,
      weightunit: PRODUCT_WEIGHT_UNIT,
      [PRODUCT_TAG_LIST]: PRODUCT_TAG_LIST,
      [PRODUCT_TAG_TEMPLATE]: PRODUCT_TAG_TEMPLATE,
      [PRODUCT_TAG_TEXT]: PRODUCT_TAG_TEXT,
      loader: LOADER,
      products: PRODUCTS,
      productsList: PRODUCTS_LIST,
      collectionsList: COLLECTIONS_LIST,
      collection: PRODUCTS_COLLECTION,
    },
  },

  /**
   * Defines the storefrontAccessToken provided by Shopify
   */
  token: { key: `${ATTRIBUTES_PREFIX}-token` },

  /**
   * Defines the domain where the Shopify store is hosted
   */
  domain: { key: `${ATTRIBUTES_PREFIX}-domain` },

  /**
   * Defines the Webflow product page slug
   */
  productPage: { key: `${ATTRIBUTES_PREFIX}-productpage`, defaultValue: '/tests/product-template' },

  /**
   * Defines the Webflow collection page slug
   */
  collectionPage: { key: `${ATTRIBUTES_PREFIX}-collectionpage`, defaultValue: '/tests/collection-template' },

  /**
   * Defines the slug or the url to redirect the user to when something goes wrong on product page
   */
  redirectURL: { key: `${ATTRIBUTES_PREFIX}-redirecturl`, defaultValue: '/404' },

  /**
   * Defines the collectionid attribute of List wrapper or Collections list.
   */
  collectionId: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_ID}` },

  /**
   * Defines the limit of products that should be returned by the collection query
   */
  productLimit: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_PRODUCT_LIMIT}` },

  /**
   * Defines the limit of collections that should be returned by the collections query
   */
  collectionLimit: { key: `${ATTRIBUTES_PREFIX}-${COLLECTIONS_LIMIT}` },

  /**
   * Defines the sort order of products/collections that should be returned by the product/collection query
   */
  sort: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_PRODUCT_SORT}` },

  /**
   * Defines the link format of the product page
   **/
  linkFormat: { key: `${ATTRIBUTES_PREFIX}-${LINK_FORMAT}` },

  /**
   * Define the type of link to be user (Product page or Collection page)
   * **/
  link: { key: `${ATTRIBUTES_PREFIX}-${LINK}`, values: { product: 'product', collection: 'collection' } },
} as const;

export const enum Sort {
  POSITION = 'position',
  MOST_RECENT = 'most-recent',
  OLDEST = 'oldest',
}

export enum LinkFormat {
  ID = 'id',
  HANDLE = 'handle',
}

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
