import Client, { Product } from 'shopify-buy';
import { queryElement, QUERY_PARAMS } from '../utils/constants';

import { ShopifyAttributeParams } from '../utils/types';

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

    checkProductTemplatePage(params.productPage);
};

// Check if the page is a product template page then bind product based on the
// query params
const checkProductTemplatePage = async (productSlug: string) => {
    const path = window.location.pathname
    if (path.endsWith(productSlug)) {

        const { id, handle } = QUERY_PARAMS

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const idValue = urlParams.get(id);
        const handleValue = urlParams.get(handle);

        if (idValue) {
            bindProductById(idValue);
        } else if (handleValue) {
            bindProductByHandle(handleValue);
        } else {
            throw new Error(`${id} or ${handle} must be provided in URL query parameter`);
        }
    }

}

export const bindProductById = async (id: string) => {
    const product = await shopifyClient.fetchProductById(id);
    bindProductData(document.querySelector("body") as HTMLElement, product);
}

/**
 * Fetches the product details using the handle to query 
 * @param handle is the handle property that uniquely identifies the product
 * @returns void
 */
export const bindProductByHandle = async (handle: string) => {
    const product = await shopifyClient.fetchProductByHandle(handle);
    bindProductData(document.querySelector("body") as HTMLElement, product);
}


const bindProductData = (parentElement: HTMLElement, product: Product) => {
    const { title, description, handle, createdAt, updatedAt, publishedAt,
        variants, type: { name: typeValue }, vendor } = product.attrs;

    const { sku, price, compareAtPrice, discount, image,
        weight } = variants[0];

    const productAttributes = ['title', 'description', 'handle', 'created', 'updated',
        'published', 'image', 'sku', 'price', 'compareprice', 'discountedpercent', 'type', 'vendor',
        'weight'];
    const productValues = [title, description, handle, createdAt, updatedAt, publishedAt, image?.src,
        sku, price, compareAtPrice, discount, typeValue, vendor, weight];

    productAttributes.forEach((attribute: string, index: number) => {
        //@ts-ignore
        const matchedElements = queryElement(attribute, { scope: parentElement, returnMultiple: true }) as NodeListOf<Element>;
        matchedElements.forEach(element => {
            if (attribute === 'image') {
                element.setAttribute('src', productValues[index])
            } else {
                element.textContent = productValues[index];
            }
        });

    })

}
