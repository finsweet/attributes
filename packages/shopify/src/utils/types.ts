import type { LinkFormat } from './constants';

export interface ShopifyAttributeParams {
  /**
   * Defines the storefrontAccessToken provided by Shopify
   */
  token: string | null;

  /**
   * Defines the domain where the Shopify store is hosted
   */
  domain: string | null;

  /**
   * Defines the Webflow product page slug.
   * @default /test/product-template
   */
  productPage: string | null;

  /**
   * Defines the slug or the url to redirect the user to when something goes wrong on
   * product page
   * @default 404.html
   */
  redirectURL: string | null;
}

export type ProductAttribute =
  | 'title'
  | 'description'
  | 'handle'
  | 'created'
  | 'updated'
  | 'published'
  | 'image'
  | 'thumbnail'
  | 'sku'
  | 'price'
  | 'compareprice'
  | 'discountpercent'
  | 'type'
  | 'vendor'
  | 'weight'
  | 'tag-list';

type Image = {
  url: string;
};

type Money = {
  amount: string;
  currencyCode: string;
};

type Variant = {
  id: string;
  sku: string;
  title: string;
  unitPrice?: Money;
  price: Money;
  compareAtPrice?: Money;
  image?: Image;
  weight?: number;
  weightUnit: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage: Image;
  tags: string[];
  productType: string;
  variants: {
    nodes: Variant[];
  };
  vendor: string;
};

export type ShopifyCollection = {
  id: string;
  description: string;
  handle: string;
  products: {
    nodes: ShopifyProduct[];
  };
};

export type ProductValue = string | string[];

export type ProductBindingOptions = {
  linkFormat?: LinkFormat;
};
export type ProductOptions = {
  productPage: string;
  linkFormat?: LinkFormat;
};
