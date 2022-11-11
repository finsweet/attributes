
import Client from 'shopify-buy';
import type { Product } from 'shopify-buy';
import type { ShopifyAttributeParams, ShopifyProduct } from './utils/types';
import { productByIdQuery } from './queries/productById';
import { productByHandle } from './queries/productByHandle';




export class ShopifyClient {
  private readonly params: ShopifyAttributeParams;
  private readonly client: Client.Client;

  constructor(params: ShopifyAttributeParams) {
    this.params = params;

    this.client = Client.buildClient({
      domain: this.params.domain!,
      storefrontAccessToken: this.params.token!,
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

  async makeRequest(query: string, variables: Record<string, string>): Promise<any> {
    const response = await fetch("https://" + this.params.domain + '/api/2022-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.params.token!,
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      }),
    });
    return response.json();
  }
}
