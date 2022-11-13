import Client from 'shopify-buy';
import type { Product } from 'shopify-buy';

import { collectionById } from './queries/collection';
import { productByHandle, productByIdQuery } from './queries/product';
import type { ProductSort } from './utils/constants';
import type { ShopifyAttributeParams, ShopifyCollection, ShopifyProduct } from './utils/types';

export class ShopifyClient {
  private readonly params: ShopifyAttributeParams;
  private readonly client: Client.Client;

  constructor(params: ShopifyAttributeParams) {
    this.params = params;

    this.client = Client.buildClient({
      domain: this.params.domain as string,
      storefrontAccessToken: this.params.token as string,
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

  getParams() {
    return this.params;
  }

  async fetchProductByIDGraphQL(id: string): Promise<ShopifyProduct> {
    const response = await this.makeRequest(productByIdQuery(), { id });
    return response.data.product as ShopifyProduct;
  }

  async fetchProductByHandleGraphQL(handle: string): Promise<ShopifyProduct> {
    const response = await this.makeRequest(productByHandle(), { handle });
    return response.data.product as ShopifyProduct;
  }

  async fetCollectionById(id: string, productLimit: number, productSort: ProductSort): Promise<ShopifyCollection> {
    const response = await this.makeRequest(collectionById(productSort), { id, productLimit });
    console.log(collectionById(productSort));
    return response.data.collection as ShopifyCollection;
  }

  async makeRequest(query: string, variables: Record<string, string | number>): Promise<any> {
    const response = await fetch('https://' + this.params.domain + '/api/2022-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.params.token as string,
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });
    return response.json();
  }
}
