import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import type { ProductAttribute } from '../../src/utils/types';

const productResponse = `{
	"data": {
		"product": {
			"id": "gid://shopify/Product/6782381752381",
			"title": "Oakley Sal",
			"description": "A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses.",
			"descriptionHtml": "<p>A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses.</p>",
			"handle": "oakley-sal",
			"createdAt": "2022-05-21T17:33:16Z",
			"updatedAt": "2022-11-06T09:55:05Z",
			"publishedAt": "2022-05-25T16:51:56Z",
			"featuredImage": {
				"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973"
			},
			"tags": ["Aditya Singh"],
			"variants": {
				"nodes": [{
					"id": "gid://shopify/ProductVariant/39949738901565",
					"sku": "FS0001",
					"title": "Small / Black",
					"unitPrice": null,
					"price": {
						"amount": "7.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "6.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973"
					},
					"weight": 250.0,
					"weightUnit": "GRAMS"
				}, {
					"id": "gid://shopify/ProductVariant/39949738934333",
					"sku": "FS0002",
					"title": "Medium / Black",
					"unitPrice": null,
					"price": {
						"amount": "11.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "10.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973"
					},
					"weight": 500.0,
					"weightUnit": "GRAMS"
				}, {
					"id": "gid://shopify/ProductVariant/39949738967101",
					"sku": "FS0003",
					"title": "Large / Black",
					"unitPrice": null,
					"price": {
						"amount": "15.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "14.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973"
					},
					"weight": 750.0,
					"weightUnit": "GRAMS"
				}, {
					"id": "gid://shopify/ProductVariant/39949738999869",
					"sku": "FS0004",
					"title": "Small / Purple",
					"unitPrice": null,
					"price": {
						"amount": "7.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "6.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976"
					},
					"weight": 250.0,
					"weightUnit": "GRAMS"
				}, {
					"id": "gid://shopify/ProductVariant/39949739032637",
					"sku": "FS0005",
					"title": "Medium / Purple",
					"unitPrice": null,
					"price": {
						"amount": "11.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "10.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976"
					},
					"weight": 500.0,
					"weightUnit": "GRAMS"
				}, {
					"id": "gid://shopify/ProductVariant/39949739065405",
					"sku": "FS0006",
					"title": "Large / Purple",
					"unitPrice": null,
					"price": {
						"amount": "15.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "14.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976"
					},
					"weight": 750.0,
					"weightUnit": "GRAMS"
				}]
			},
			"productType": "Logo Art",
			"vendor": "Finsweet Art Shop"
		}
	}
}`;

export const productRoute = (page: Page): Promise<void> =>
    page.route('https://finsweet-art-shop.myshopify.com/api/2022-10/graphql.json', (route) => {
        route.fulfill({
            headers: {
                'Content-Type': 'application/json; ',
            },
            body: productResponse,
        });
    });

const expectedValues: { [key in ProductAttribute]: (_: Page) => Promise<void> } = {
    title: async (page: Page) => {
        const locator = await page.locator(`css=[fs-shopify-element="title"]`);
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
        await expect(locator).toContainText('2022-11-06T09:55:05Z');
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
        await expect(locator).toContainText('Logo Art');
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
        // 'discountpercent',
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

test.beforeEach(async ({ page }) => {
    await productRoute(page);
});

test.describe('Default Product Template', () => {
    //before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('/packages/shopify/tests/fixtures/product-template?id=6782381752381');
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
        await page.goto('/packages/shopify/tests/fixtures/custom-product-slug?id=6782381752381');
    });
    test('Product binding', async ({ page }) => {
        await testProductAttribute(page);
    });

    test('Loader is not shown', async ({ page }) => {
        await testLoader(page);
    });
});
