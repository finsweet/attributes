import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsfilter');
});

test.describe('cmsfilter', () => {
  test('Sorts correctly', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsfilter', resolve])));
  });
});
