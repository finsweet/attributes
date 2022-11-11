import { generateSelectors } from '$global/factory';

export const ATTRIBUTE = 'shopify';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const EXAMPLE_ELEMENT_KEY = 'example';
export const EXAMPLE_SETTING_KEY = 'example';
export const EXAMPLE_SETTING_VALUES = { value: 'value' };
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
export const LOADER = 'loader';

export const PRODUCT_ID_PREFIX = 'gid://shopify/Product/';

export const productAttributes = [
  'title',
  'description',
  'handle',
  'created',
  'updated',
  'published',
  'image',
  'sku',
  'price',
  'compareprice',
  'discountpercent',
  'type',
  'vendor',
  'weight',
  'weightunit',
];

export const QUERY_PARAMS = {
  id: 'id',
  handle: 'handle',
};

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * This is an element example definition.
       */
      example: EXAMPLE_ELEMENT_KEY,

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
      loader: LOADER,
    },
  },

  /**
   * Defines a setting example definition.
   */
  example: {
    key: `${ATTRIBUTES_PREFIX}-${EXAMPLE_SETTING_KEY}`,
    values: EXAMPLE_SETTING_VALUES,
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
