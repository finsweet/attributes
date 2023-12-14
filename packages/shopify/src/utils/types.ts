import type { LinkFormat } from './constants';
import type { generateDynamicAttibuteValue } from './generateDynamicAttibuteValue';

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
   * Defines the Webflow collection page slug.
   * @default /test/collection-template
   */
  collectionPage: string | null;

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

export type CollectionAttribute = 'title' | 'description' | 'handle' | 'image';

type Image = {
  url: string;
};

type Money = {
  amount: string;
  currencyCode: string;
};

export type Option = {
  id: string;
  name: string;
  values: string[];
};

export type Variant = {
  id: string;
  sku: string;
  title: string;
  normalisedTitle?: string;
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
  options: Option[];
  variants: {
    nodes: Variant[];
  };
  vendor: string;
};

export type ShopifyCollection = {
  id: string;
  description: string;
  handle: string;
  title: string;
  updatedAt: string;
  image: Image;
};

export type ShopifyCollectionWithProducts = ShopifyCollection & {
  products: {
    nodes: ShopifyProduct[];
  };
};

export type ProductValue = string | string[];
export type CollectionValue = string | string[];

export type ProductBindingOptions = {
  linkFormat?: LinkFormat;
};
export type ShopifyBindingOptions = {
  productPage: string;
  collectionPage: string;
  linkFormat?: LinkFormat;
  collectionId?: string;
  collectionHandle?: string;
  collectionName?: string;
};

// v1 types

export type AttributeStaticValue = string;
export type AttributeDynamicValue = ReturnType<typeof generateDynamicAttibuteValue>;
export type AttributeValue = AttributeStaticValue | AttributeDynamicValue;
export type AttributeOperator = 'prefixed' | 'suffixed' | 'contains';

export type AttributesDefinition = {
  [name: string]: {
    key: string;
    values?: {
      [valueKey: string]: AttributeValue;
    };
  };
};

/**
 * Global params.
 */
export interface GlobalAttributeParams<AttributeKeys extends Record<string, string>> {
  /**
   * Defines if the `<script>` should prevent automatically loading the library.
   * Useful for cases where a JS developer whants to programatically init the library.
   */
  preventsLoad: boolean;

  /**
   * The parsed custom attributes from the <script> tag.
   */
  attributes: { [Key in keyof AttributeKeys]: string | null };
}
