import { test, expect } from '@playwright/test';

/**
 * These are some demo tests to showcase Playwright.
 * You can run the tests by running `pnpm dev`.
 * If you need more info about writing tests, please visit {@link https://playwright.dev/}.
 */

test.beforeEach(async ({ page }) => {
  await page.goto('https://fs-attributes.webflow.io/cms/cmsfilter');
});

test.describe('fs-cmsfilter-allowsubmit', () => {
  test('Clicking submit should submit the form', async ({ page }) => {
    await page.locator('[data-test="color-radio"]').nth(1).click({ force: true });
    await expect(page.locator('[data-test="color-radio"]').nth(1)).toBeChecked();

    await page.locator('[data-test="submit-2"]').click();

    await expect(page.locator('[data-test="form-success"]')).toBeVisible();
  });
});
