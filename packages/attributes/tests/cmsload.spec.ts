import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsload');
});

test.describe('cmsload', () => {
  test('Loads items correctly', async ({ page }) => {
    await waitAttributeLoaded(page, 'cmsload');

    // Pagination mode
    // TODO: migrate to fs-list
    const collectionWrapper1 = page.locator('[fs-cmsload-element="list-1"]');
    const collectionItems1 = collectionWrapper1.locator('.w-dyn-item');
    const paginationPrevious1 = collectionWrapper1.locator('.w-pagination-previous');
    const paginationNext1 = collectionWrapper1.locator('.w-pagination-next');
    const pageButtons1 = collectionWrapper1.locator('[fs-cmsload-element="page-button"]');

    expect(await collectionItems1.count()).toBe(2);
    await expect(collectionItems1.first()).toHaveText(/Project 35/);
    await expect(pageButtons1.first()).toHaveText(/1/);
    await expect(pageButtons1.first()).toHaveClass(/w--current/);
    await expect(pageButtons1.last()).toHaveText(/18/);
    await expect(paginationPrevious1).toBeHidden();
    await expect(paginationNext1).toBeVisible();

    // Switch to page 2
    await paginationNext1.click();
    await page.waitForTimeout(200);

    expect(await collectionItems1.count()).toBe(2);
    await expect(collectionItems1.first()).toHaveText(/Project 33/);
    await expect(pageButtons1.first()).not.toHaveClass(/w--current/);
    await expect(pageButtons1.nth(1)).toHaveClass(/w--current/);
    await expect(paginationPrevious1).toBeVisible();
    await expect(paginationNext1).toBeVisible();

    // Switch to last page
    await pageButtons1.last().click();
    await page.waitForTimeout(200);

    expect(await collectionItems1.count()).toBe(1);
    await expect(collectionItems1.first()).toHaveText(/Project 1/);
    await expect(pageButtons1.last()).toHaveClass(/w--current/);
    await expect(paginationPrevious1).toBeVisible();
    await expect(paginationNext1).toBeHidden();

    // Load Under mode
    const collectionWrapper2 = page.locator('[fs-cmsload-element="list-2"]');
    const collectionItems2 = collectionWrapper2.locator('.w-dyn-item');
    const paginationNext2 = collectionWrapper2.locator('.w-pagination-next');

    expect(await collectionItems2.count()).toBe(2);

    // Load more
    await paginationNext2.click();
    await page.waitForTimeout(200);

    expect(await collectionItems2.count()).toBe(4);

    // Infinite mode
    const collectionWrapper3 = page.locator('[fs-cmsload-element="list-3"]');
    const collectionItems3 = collectionWrapper3.locator('.w-dyn-item');

    expect(await collectionItems3.count()).toBe(6);

    // Scroll to bottom of the list
    // TODO: This one is flaky so I've disabled it for now
    // const documentHeight = await page.evaluate(() => document.body.offsetHeight);

    // await paginationNext3.scrollIntoViewIfNeeded();
    // await page.keyboard.press('PageDown');
    // await page.mouse.wheel(0, documentHeight);
    // await page.waitForTimeout(1000);

    // expect(await collectionItems3.count()).toBeGreaterThan(6);

    // Render All mode
    const collectionWrapper4 = page.locator('[fs-cmsload-element="list-4"]');
    const collectionItems4 = collectionWrapper4.locator('.w-dyn-item');

    expect(await collectionItems4.count()).toBe(35);
  });
});
