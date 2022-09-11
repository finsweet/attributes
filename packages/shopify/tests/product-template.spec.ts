import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import type { ProductAttribute } from '../src/utils/types';

const productResponse = `{
    "data": {
        "node": {
            "__typename": "Product",
            "id": "gid://shopify/Product/6782381752381",
            "availableForSale": true,
            "createdAt": "2022-05-21T17:33:16Z",
            "updatedAt": "2022-05-25T16:51:56Z",
            "descriptionHtml": "<p>A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses.</p>",
            "description": "A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses.",
            "handle": "oakley-sal",
            "productType": "Logo Art",
            "title": "Oakley Sal",
            "vendor": "Finsweet Art Shop",
            "publishedAt": "2022-05-25T16:51:56Z",
            "onlineStoreUrl": null,
            "options": [
                {
                    "id": "gid://shopify/ProductOption/8774756597821",
                    "name": "Size",
                    "values": [
                        "Small",
                        "Medium",
                        "Large"
                    ]
                },
                {
                    "id": "gid://shopify/ProductOption/8774756630589",
                    "name": "Color",
                    "values": [
                        "Black",
                        "Purple"
                    ]
                }
            ],
            "images": {
                "pageInfo": {
                    "hasNextPage": false,
                    "hasPreviousPage": false
                },
                "edges": [
                    {
                        "cursor": "eyJsYXN0X2lkIjoyOTAyMDMyMDIwMjgxMywibGFzdF92YWx1ZSI6MX0=",
                        "node": {
                            "id": "gid://shopify/ProductImage/29020320202813",
                            "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973",
                            "altText": null,
                            "width": 500,
                            "height": 500
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjoyOTAyMDMyMDMwMTExNywibGFzdF92YWx1ZSI6Mn0=",
                        "node": {
                            "id": "gid://shopify/ProductImage/29020320301117",
                            "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976",
                            "altText": null,
                            "width": 500,
                            "height": 500
                        }
                    }
                ]
            },
            "variants": {
                "pageInfo": {
                    "hasNextPage": false,
                    "hasPreviousPage": false
                },
                "edges": [
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczODkwMTU2NSwibGFzdF92YWx1ZSI6MX0=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949738901565",
                            "title": "Small / Black",
                            "price": "7.99",
                            "priceV2": {
                                "amount": "7.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 250,
                            "available": true,
                            "sku": "FS0001",
                            "compareAtPrice": "6.99",
                            "compareAtPriceV2": {
                                "amount": "6.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320202813",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Small"
                                },
                                {
                                    "name": "Color",
                                    "value": "Black"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczODkzNDMzMywibGFzdF92YWx1ZSI6Mn0=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949738934333",
                            "title": "Medium / Black",
                            "price": "11.99",
                            "priceV2": {
                                "amount": "11.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 500,
                            "available": true,
                            "sku": "FS0002",
                            "compareAtPrice": "10.99",
                            "compareAtPriceV2": {
                                "amount": "10.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320202813",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Medium"
                                },
                                {
                                    "name": "Color",
                                    "value": "Black"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczODk2NzEwMSwibGFzdF92YWx1ZSI6M30=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949738967101",
                            "title": "Large / Black",
                            "price": "15.99",
                            "priceV2": {
                                "amount": "15.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 750,
                            "available": true,
                            "sku": "FS0003",
                            "compareAtPrice": "14.99",
                            "compareAtPriceV2": {
                                "amount": "14.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320202813",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Large"
                                },
                                {
                                    "name": "Color",
                                    "value": "Black"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczODk5OTg2OSwibGFzdF92YWx1ZSI6NH0=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949738999869",
                            "title": "Small / Purple",
                            "price": "7.99",
                            "priceV2": {
                                "amount": "7.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 250,
                            "available": true,
                            "sku": "FS0004",
                            "compareAtPrice": "6.99",
                            "compareAtPriceV2": {
                                "amount": "6.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320301117",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Small"
                                },
                                {
                                    "name": "Color",
                                    "value": "Purple"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczOTAzMjYzNywibGFzdF92YWx1ZSI6NX0=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949739032637",
                            "title": "Medium / Purple",
                            "price": "11.99",
                            "priceV2": {
                                "amount": "11.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 500,
                            "available": true,
                            "sku": "FS0005",
                            "compareAtPrice": "10.99",
                            "compareAtPriceV2": {
                                "amount": "10.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320301117",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Medium"
                                },
                                {
                                    "name": "Color",
                                    "value": "Purple"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    },
                    {
                        "cursor": "eyJsYXN0X2lkIjozOTk0OTczOTA2NTQwNSwibGFzdF92YWx1ZSI6Nn0=",
                        "node": {
                            "id": "gid://shopify/ProductVariant/39949739065405",
                            "title": "Large / Purple",
                            "price": "15.99",
                            "priceV2": {
                                "amount": "15.99",
                                "currencyCode": "GBP"
                            },
                            "weight": 750,
                            "available": true,
                            "sku": "FS0006",
                            "compareAtPrice": "14.99",
                            "compareAtPriceV2": {
                                "amount": "14.99",
                                "currencyCode": "GBP"
                            },
                            "image": {
                                "id": "gid://shopify/ProductImage/29020320301117",
                                "src": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976",
                                "altText": null,
                                "width": 500,
                                "height": 500
                            },
                            "selectedOptions": [
                                {
                                    "name": "Size",
                                    "value": "Large"
                                },
                                {
                                    "name": "Color",
                                    "value": "Purple"
                                }
                            ],
                            "unitPrice": null,
                            "unitPriceMeasurement": {
                                "measuredType": null,
                                "quantityUnit": null,
                                "quantityValue": 0,
                                "referenceUnit": null,
                                "referenceValue": 0
                            }
                        }
                    }
                ]
            }
        }
    }
}`;

export const productRoute = (page: Page): Promise<void> =>
  page.route('https://finsweet-art-shop.myshopify.com/api/2022-04/graphql', (route) => {
    route.fulfill({
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: productResponse,
    });
  });

test.beforeEach(async ({ page }) => {
  await productRoute(page);
});

const expectedValues: { [key in ProductAttribute]: (_: Page) => Promise<void> } = {
  title: async (page: Page) => {
    const locator = page.locator(`css=[fs-shopify-element="title"]`);
    await expect(locator).toContainText(['Oakley Sal', 'Oakley Sal']);
  },
  description: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="description"]`);
    await expect(locator).toContainText([
      'A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses',
    ]);
  },
  handle: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="handle"]`);
    await expect(locator).toContainText('oakley-sal');
  },
  created: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="created"]`);
    await expect(locator).toContainText('2022-05-21T17:33:16Z');
  },
  updated: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="updated"]`);
    await expect(locator).toContainText('2022-05-25T16:51:56Z');
  },
  published: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="published"]`);
    await expect(locator).toContainText('2022-05-25T16:51:56Z');
  },
  image: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="image"]`);
    const src = await locator.evaluate((e) => (e as HTMLElement).getAttribute('src'));
    await expect(src).toBe(
      'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973'
    );
  },
  sku: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="sku"]`);
    await expect(locator).toContainText('FS0001');
  },
  price: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="price"]`);
    await expect(locator).toContainText('7.99');
  },
  compareprice: function () {
    throw new Error('Function not implemented.');
  },
  discountpercent: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="discountpercent"]`);
    await expect(locator).toContainText('0');
  },
  type: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="type"]`);
    await expect(locator).toContainText('Product');
  },
  vendor: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="vendor"]`);
    await expect(locator).toContainText('Finsweet Art Shop');
  },
  weight: async function (page: Page) {
    const locator = page.locator(`css=[fs-shopify-element="weight"]`);
    await expect(locator).toContainText('250');
  },
};

const testProductAttribute = async (page: Page) => {
  const keys = [
    'title',
    'description',
    'handle',
    'created',
    'updated',
    'published',
    'image',
    'sku',
    'price',
    'discountpercent',
    'type',
    'vendor',
    'weight',
  ];
  for (let i = 0; i < keys.length; i++) {
    await expectedValues[keys[i] as ProductAttribute](page);
  }
};

const testLoader = async (page: Page) => {
  const locator = page.locator(`css=[fs-shopify-element="loader"]`);
  await expect(locator).not.toBeVisible();
};

test.describe('Default Product Template', () => {
  //before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('tests/fixtures/product-template?id=6782381752381');
  });
  test('Product binding', async ({ page }) => {
    await testProductAttribute(page);
  });

  test('Loader is not shown', async ({ page }) => {
    await testLoader(page);
  });
});

test.describe('Custom slug with Product Template', () => {
  //before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('tests/fixtures/custom-product-slug?id=6782381752381');
  });
  test('Product binding', async ({ page }) => {
    await testProductAttribute(page);
  });

  test('Loader is not shown', async ({ page }) => {
    await testLoader(page);
  });
});
