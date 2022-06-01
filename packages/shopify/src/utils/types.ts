import { GlobalAttributeParams } from '$global/types/global';

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
   * Defines the Webflow product page slug
   */
    productPage: string;
}
