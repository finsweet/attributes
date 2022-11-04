import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsnest');
});

test.describe('cmsnest', () => {
  test('Populates nested lists correctly', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsload', resolve])));
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsnest', resolve])));

    const collectionListWrapper = page.locator('[fs-cmsnest-element="list"]').first();
    const collectionList = collectionListWrapper.locator(':scope > .w-dyn-items');
    const collectionItems = collectionList.locator(':scope > .w-dyn-item');
    const categoriesList = collectionItems.first().locator('[fs-cmsnest-collection="categories"] > .w-dyn-items');
    const categoriesItems = categoriesList.locator(':scope > .w-dyn-item');
    const servicesList = categoriesItems.first().locator('[fs-cmsnest-collection="services"] > .w-dyn-items');
    const servicesItems = servicesList.locator(':scope > .w-dyn-item');
    const colors1List = servicesItems.first().locator('[fs-cmsnest-collection="colors"] > .w-dyn-items');
    const colors1Items = colors1List.locator(':scope > .w-dyn-item');
    const colors2Empty = servicesItems.nth(1).locator('[fs-cmsnest-collection="colors"] > [fs-cmsnest-empty="colors"]');

    expect(await categoriesItems.count()).toBe(5);
    expect(await servicesItems.count()).toBe(2);
    expect(await colors1Items.count()).toBe(1);
    await expect(colors1Items.first()).toHaveText(/Blue/);
    await expect(colors2Empty).toBeVisible();
  });
});
