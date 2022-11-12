import { generateSelectors } from '$global/factory';

export const ATTRIBUTE = 'shopify';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const PRODUCT_TITLE = 'title';
export const PRODUCT_DESCRIPTION = 'description';
export const PRODUCT_HANDLE = 'handle';
export const PRODUCT_CREATED = 'created';
export const PRODUCT_UPDATED = 'updated';
export const PRODUCT_PUBLISHED = 'published';
export const PRODUCT_IMAGE = 'image';
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
export const LOADER = 'loader';

export const PRODUCT_ID_PREFIX = 'gid://shopify/Product/';

export const productAttributes = [
  PRODUCT_TITLE,
  PRODUCT_DESCRIPTION,
  PRODUCT_HANDLE,
  PRODUCT_CREATED,
  PRODUCT_UPDATED,
  PRODUCT_PUBLISHED,
  PRODUCT_IMAGE,
  PRODUCT_SKU,
  PRODUCT_PRICE,
  PRODUCT_COMPARE_PRICE,
  PRODUCT_DISCOUNTED_PERCENT,
  PRODUCT_TYPE,
  PRODUCT_VENDOR,
  PRODUCT_WEIGHT,
  PRODUCT_WEIGHT_UNIT,
  PRODUCT_TAG_LIST,
];

export const QUERY_PARAMS = {
  id: 'id',
  handle: 'handle',
};

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      // product elements
      title: PRODUCT_TITLE,
      description: PRODUCT_DESCRIPTION,
      handle: PRODUCT_HANDLE,
      created: PRODUCT_CREATED,
      updated: PRODUCT_UPDATED,
      published: PRODUCT_PUBLISHED,
      image: PRODUCT_IMAGE,
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
   * Defines the slug or the url to redirect the user to when something goes wrong on product page
   */
  redirectURL: { key: `${ATTRIBUTES_PREFIX}-redirecturl`, defaultValue: '/404' },

  /**
   * Used for running tests
   */
  testMode: { key: `${ATTRIBUTES_PREFIX}-testmode`, defaultValue: false },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);
