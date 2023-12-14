import { type AttributeElements, type AttributeSettings, SHOPIFY_ATTRIBUTE } from '@finsweet/attributes-utils';

export const SHOPIFY_ELEMENT_ATTRIBUTE = `fs-${SHOPIFY_ATTRIBUTE}-element`;
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
export const PRODUCT_TAG_LIST = 'taglist';
export const PRODUCT_TAG_TEMPLATE = 'tagtemplate';
export const PRODUCT_TAG_TEXT = 'tagtext';
export const PRODUCTS_LIST = 'productslist';
export const PRODUCTS_COLLECTION = 'collection';
export const PRODUCTS_OPTION_TEMPLATE = 'optiontemplate';
export const PRODUCTS_OPTION_NAME = 'optionname';
export const PRODUCTS_VARIANT_LIST = 'variantlist';
export const PRODUCTS_VARIANT_SEPARATOR = ' / ';

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
export const PRODUCT_LIMIT = 'productlimit';
export const COLLECTIONS_LIMIT = 'collectionlimit';
export const COLLECTION_PRODUCT_SORT = 'sort';
export const COLLECTIONS_LIST = 'collectionslist';
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

export const ELEMENTS = [
  'id',
  'title',
  'description',
  'handle',
  'created',
  'updated',
  'published',
  'image',
  'thumbnail',
  'sku',
  'price',
  'compareprice',
  'discountpercent',
  'type',
  'vendor',
  'weight',
  'weightunit',
  'taglist',
  'tagtemplate',
  'tagtext',
  'loader',
  'products',
  'collectionslist',
  'collection',
  'optiontemplate',
  'optionname',
  'variantlist',
  'collectionid',
  'productslist',
  'collectionslist',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the storefrontAccessToken provided by Shopify
   */
  token: { key: `token` },

  /**
   * Defines the domain where the Shopify store is hosted
   */
  domain: { key: `domain` },

  /**
   * Defines the Webflow product page slug
   */
  productPage: {
    key: `productpage`,
    values: {
      default: '/tests/product-template',
    },
  },

  /**
   * Defines the Webflow collection page slug
   */
  collectionPage: {
    key: `collectionpage`,
    values: {
      default: '/tests/collection-template',
    },
  },

  /**
   * Defines the slug or the url to redirect the user to when something goes wrong on product page
   */
  redirectURL: {
    key: `redirecturl`,
    values: {
      default: '/404',
    },
  },

  /**
   * Defines the collectionid attribute of List wrapper or Collections list.
   */
  collectionid: { key: `${COLLECTION_ID}` },

  /**
   * Defines the limit of products that should be returned by the collection query
   */
  productLimit: { key: `${PRODUCT_LIMIT}` },

  /**
   * Defines the limit of collections that should be returned by the collections query
   */
  collectionLimit: { key: `${COLLECTIONS_LIMIT}` },

  /**
   * Defines the sort order of products/collections that should be returned by the product/collection query
   */
  sort: { key: `${COLLECTION_PRODUCT_SORT}` },

  /**
   * Defines the link format of the product page
   **/
  linkformat: { key: `${LINK_FORMAT}` },

  /**
   * Define the type of link to be user (Product page or Collection page)
   * **/
  link: { key: `${LINK}`, values: { product: 'product', collection: 'collection' } },
} as const satisfies AttributeSettings;

export const sortOptions: { [k: string]: string } = {
  position: 'position',
  'most-recent': 'most-recent',
  oldest: 'oldest',
};

export enum LinkFormat {
  ID = 'id',
  HANDLE = 'handle',
}
