import type { GlobalAttributeParams } from '@global/factory/types';

export interface ShopifyAttributeParams {
  globalAttributeParams: GlobalAttributeParams;

  /**
   * Defines the storefrontAccessToken provided by Shopify
   */
  token: string;

  /**
   * Defines the domain where the Shopify store is hosted
   */
  domain: string;

  /**
   * Defines the Webflow product page slug.
   * @default /test/product-template
   */
  productPage: string;

  /**
   * Defines the slug or the url to redirect the user to when something goes wrong on
   * product page
   * @default 404.html
   */
  redirectURL: string;

  /**
   * Used for running tests
   *
   * @default false
   */
  testMode: boolean;
}

export type ProductAttribute =
  | 'title'
  | 'description'
  | 'handle'
  | 'created'
  | 'updated'
  | 'published'
  | 'image'
  | 'sku'
  | 'price'
  | 'compareprice'
  | 'discountpercent'
  | 'type'
  | 'vendor'
  | 'weight';
