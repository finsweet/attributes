import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/readtime');
});

test.describe('readtime', () => {
  test('Displays the read time', async ({ page }) => {
    const timeElement = page.locator('[fs-readtime-element="time"]');
    await expect(timeElement).toHaveText('4.2');

    const timeElement2 = page.locator('[fs-readtime-element="time-2"]');
    await expect(timeElement2).toHaveText('1.0');
  });
});
