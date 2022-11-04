import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/countitems');
});

test.describe('countitems', () => {
  test('Displays the items count', async ({ page }) => {
    const value1 = page.getByTestId('value-1');
    const value2 = page.getByTestId('value-2');

    await expect(value1).toHaveText('35');
    await expect(value2).toHaveText('6');
  });
});
