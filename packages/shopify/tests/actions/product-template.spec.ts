import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

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
			"updatedAt": "2022-11-07T19:12:24Z",
			"publishedAt": "2022-05-25T16:51:56Z",
			"featuredImage": {
				"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973"
			},
			"tags": ["Aditya Singh", "Blessing"],
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
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159974"
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
						"amount": "31.99",
						"currencyCode": "GBP"
					},
					"compareAtPrice": {
						"amount": "30.99",
						"currencyCode": "GBP"
					},
					"image": {
						"url": "https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976"
					},
					"weight": 508.0,
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
			"options": [{
				"id": "gid://shopify/ProductOption/8774756597821",
				"name": "Size",
				"values": ["Small", "Medium", "Large"]
			}, {
				"id": "gid://shopify/ProductOption/8774756630589",
				"name": "Color",
				"values": ["Black", "Purple"]
			}],
			"productType": "Logo Art",
			"vendor": "Finsweet Art Shop"
		}
	}
}`;

const productTemplatePath = '/packages/shopify/tests/fixtures/product-template.html';
const customSlugProductTemplatePath = '/packages/shopify/tests/fixtures/custom-product-slug.html';

export const productRoute = (page: Page): Promise<void> =>
  page.route('https://finsweet-art-shop.myshopify.com/api/2022-10/graphql.json', (route) => {
    route.fulfill({
      headers: {
        'Content-Type': 'application/json; ',
      },
      body: productResponse,
    });
  });

const expectedValues: { [key in ProductAttribute]: (_: Page, value: ProductValue) => Promise<void> } = {
  title: async (page: Page, title: ProductValue) => {
    const locator = await page.locator(`css=[fs-shopify-element="title"]`);
    await expect(locator).toHaveText(title);
  },
  description: async function (page: Page, description: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="description"]`);
    await expect(locator).toHaveText(description);
  },
  handle: async function (page: Page, handle: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="handle"]`);
    await expect(locator).toHaveText(handle);
  },
  created: async function (page: Page, created: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="created"]`);
    await expect(locator).toHaveText(created);
  },
  updated: async function (page: Page, updated: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="updated"]`);
    await expect(locator).toHaveText(updated);
  },
  published: async function (page: Page, published: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="published"]`);
    await expect(locator).toHaveText(published);
  },
  image: async function (page: Page, image: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="image"]`);
    const src = await locator.evaluate((e) => (e as HTMLElement).getAttribute('src'));
    await expect(src).toBe(image);
  },
  thumbnail: async function (page: Page, thumbnail: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="thumbnail"]`);
    const src = await locator.evaluate((e) => (e as HTMLElement).getAttribute('src'));
    await expect(src).toBe(thumbnail);
  },
  sku: async function (page: Page, sku: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="sku"]`);
    await expect(locator).toHaveText(sku);
  },
  price: async function (page: Page, price: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="price"]`);
    await expect(locator).toHaveText(price);
  },
  compareprice: function () {
    throw new Error('Function not implemented.');
  },
  discountpercent: async function (page: Page, discountPercent: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="discountpercent"]`);
    await expect(locator).toHaveText(discountPercent);
  },
  type: async function (page: Page, type: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="type"]`);
    await expect(locator).toHaveText(type);
  },
  vendor: async function (page: Page, vendor: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="vendor"]`);
    await expect(locator).toHaveText(vendor);
  },
  weight: async function (page: Page, weight: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="weight"]`);
    await expect(locator).toHaveText(weight);
  },
  'tag-list': async function (page: Page, tagList: ProductValue) {
    const locator = page.locator(`css=[fs-shopify-element="tag-text"]`);
    await expect(locator).toHaveText(tagList);
  },
};
type ProductValue = string | RegExp | Array<string | RegExp>;
type ProductExpectedValues = { [key in ProductAttribute]: ProductValue };

const defaultProductExpectedValues: Partial<ProductExpectedValues> = {
  title: ['Oakley Sal', 'Oakley Sal'],
  description: [
    'A set of words that is complete in itself, typically containing a subject and predicate, conveying a statement, question, exclamation, or command, and consisting of a main clause and sometimes one or more subordinate clauses.',
  ],
  handle: 'oakley-sal',
  created: '2022-05-21T17:33:16Z',
  updated: '2022-11-07T19:12:24Z',
  published: '2022-05-25T16:51:56Z',
  image: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973',
  thumbnail: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159973',
  sku: 'FS0001',
  price: '7.99',
  discountpercent: '0',
  type: 'Logo Art',
  vendor: 'Finsweet Art Shop',
  weight: '250',
  'tag-list': ['Aditya Singh', 'Blessing'],
};

const productKeys: ProductAttribute[] = [
  'title',
  'description',
  'handle',
  'created',
  'updated',
  'published',
  'image',
  'thumbnail',
  'sku',
  'price',
  'discountpercent',
  'type',
  'vendor',
  'weight',
  'tag-list',
];
const testProductAttribute = async (page: Page, defaultExpectedValues = defaultProductExpectedValues) => {
  for (let i = 0; i < productKeys.length; i++) {
    if (!defaultExpectedValues[productKeys[i]]) continue;
    await expectedValues[productKeys[i]](page, defaultExpectedValues[productKeys[i]] as ProductValue);
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
  let queryParams = '?id=6782381752381';
  test('Product binding', async ({ page }) => {
    await page.goto(`${productTemplatePath}${queryParams}`);
    await testProductAttribute(page);
  });

  test('Loader is not shown', async ({ page }) => {
    await page.goto(`${productTemplatePath}${queryParams}`);
    await testLoader(page);
  });

  test('It shows the right option names', async ({ page }) => {
    await page.goto(`${productTemplatePath}${queryParams}`);
    const locator = page.locator(`css=[fs-shopify-element="option-name"]`);
    await expect(locator).toHaveText(['Size', 'Color']);
  });

  test('First option is selected by default', async ({ page }) => {
    await page.goto(`${productTemplatePath}${queryParams}`);

    // Size option
    const locator = page.locator(`css=[name="radio-0"]`);
    await expect(
      await locator.evaluateAll((nodes) => {
        return nodes.map((node) => node.parentElement?.querySelector('.w--redirected-checked') !== null);
      })
    ).toStrictEqual([true, false, false]);

    // Color option
    const locator2 = page.locator(`css=[name="radio-1"]`);
    await expect(
      await locator2.evaluateAll((nodes) => {
        return nodes.map((node) => node.parentElement?.querySelector('.w--redirected-checked') !== null);
      })
    ).toStrictEqual([true, false]);
  });

  test('It shows the right product attributes when option is selected', async ({ page }) => {
    await page.goto(`${productTemplatePath}${queryParams}`);

    // Size option
    let locator = page.locator(`css=[name="radio-0"]`).nth(1);
    await locator.click({
      force: true,
    });

    await testProductAttribute(page, {
      ...defaultProductExpectedValues,
      image: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159974',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/joe-black-fs-shopify-01.png?v=1653159974',
      sku: 'FS0002',
      price: '11.99',
      weight: '500',
    });

    // Color option
    locator = page.locator(`css=[name="radio-1"]`).nth(1);
    await locator.click({
      force: true,
    });

    await testProductAttribute(page, {
      ...defaultProductExpectedValues,
      image: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0571/7003/4749/products/purple-fs-shopify-01.png?v=1653159976',
      sku: 'FS0005',
      price: '31.99',
      weight: '508',
    });
  });

  test('It redirects to 404 page When "id" and "handle" are not provided', async ({ page }) => {
    queryParams = '';
    await page.goto(`${productTemplatePath}${queryParams}`);
    await expect(page).toHaveURL(/.*404.html/);
  });
});

test.describe('Custom slug with Product Template', () => {
  let queryParams = '?id=6782381752381';

  test('Product binding', async ({ page }) => {
    await page.goto(`${customSlugProductTemplatePath}${queryParams}`);
    await testProductAttribute(page);
  });

  test('Loader is not shown', async ({ page }) => {
    await page.goto(`${customSlugProductTemplatePath}${queryParams}`);
    await testLoader(page);
  });

  test('It redirects to 404 page When "id" and "handle" are not provided', async ({ page }) => {
    queryParams = '';
    await page.goto(`${customSlugProductTemplatePath}${queryParams}`);
    await expect(page).toHaveURL(/.*custom-404.html/);
  });
});
