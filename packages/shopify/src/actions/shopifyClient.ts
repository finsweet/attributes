import Client from 'shopify-buy';
import type { Product } from 'shopify-buy';

import { queryElement, QUERY_PARAMS, PRODUCT_ID_PREFIX } from '../utils/constants';
import type { ProductAttribute, ShopifyAttributeParams } from '../utils/types';

class ShopifyClient {
  private readonly token: string;
  private readonly domain: string;
  private readonly client: Client.Client;

  constructor(params: ShopifyAttributeParams) {
    this.token = params.token;
    this.domain = params.domain;

    this.client = Client.buildClient({
      domain: this.domain,
      storefrontAccessToken: this.token,
    });
  }

  async fetchProductById(id: string): Promise<Product> {
    return this.client.product.fetch(id);
  }

  async fetchProductByHandle(handle: string): Promise<Product> {
    return this.client.product.fetchByHandle(handle);
  }

  async fetchAllProducts(): Promise<Product[]> {
    return this.client.product.fetchAll();
  }
}

let shopifyClient: ShopifyClient;
let attributesParams: ShopifyAttributeParams;

export const initializeShopifyClient = async (params: ShopifyAttributeParams) => {
  shopifyClient = new ShopifyClient(params);
  attributesParams = params;

  checkProductTemplatePage();
};

// Check if the page is a product template page then bind product based on the
// query params
const checkProductTemplatePage = async () => {
  const { productPage, redirectURL } = attributesParams;

  const path = window.location.pathname;
  if (path.endsWith(productPage)) {
    const { id, handle } = QUERY_PARAMS;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const idValue = PRODUCT_ID_PREFIX + urlParams.get(id);
    const handleValue = urlParams.get(handle);

    try {
      let product: Product;
      if (idValue) {
        product = await shopifyClient.fetchProductById(idValue);
      } else if (handleValue) {
        product = await shopifyClient.fetchProductByHandle(handle);
      } else {
        window.location.href = redirectURL as string;
        return;
      }
      bindProductData(document.body, product);
    } catch (e) {
      window.location.href = redirectURL as string;
    }
  }
};

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
];

const bindProductData = (parentElement: HTMLElement, product: Product) => {
  const {
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    variants,
    type: { name: typeValue },
    vendor,
  } = product.attrs;

  const { sku, price, compareAtPrice, discount, image, weight } = variants[0];

  const productValues = [
    title,
    description,
    handle,
    createdAt,
    updatedAt,
    publishedAt,
    image?.src,
    sku,
    price,
    compareAtPrice,
    discount || 0,
    typeValue,
    vendor,
    weight,
  ];

  productAttributes.forEach((attribute: string, index: number) => {
    const matchedElements = queryElement(attribute as ProductAttribute, {
      scope: parentElement,
      all: true,
    }) as NodeListOf<Element>;
    matchedElements.forEach((element) => {
      if (attribute === 'image') {
        element.setAttribute('src', productValues[index]);
      } else {
        element.textContent = productValues[index];
      }
    });
  });
};
