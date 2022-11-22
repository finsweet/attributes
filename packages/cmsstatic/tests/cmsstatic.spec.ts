import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fs-attributes.webflow.io/cmsstatic');
});

/**
 * These are some demo tests to showcase Playwright.
 * You can run the tests by running `pnpm dev`.
 * If you need more info about writing tests, please visit {@link https://playwright.dev/}.
 */

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://demo.playwright.dev/todomvc');
// });

test.describe('cmsstatic', () => {
  test('Set static item in correct position', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsstatic', resolve])));

    const allItems = page.locator('[fs-cmsstatic-element="list-2"] > .w-dyn-items > *');

    await expect(await allItems.nth(1).getAttribute('fs-cmsstatic-order')).toBe('2');

    await page.locator('text=Black').click();

    await new Promise((resolve) => setTimeout(() => resolve(null), 2000));
    await expect(await allItems.nth(1).getAttribute('fs-cmsstatic-order')).toBe('2');
  });
});
