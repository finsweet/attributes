import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/countitems');
});

test.describe('countitems', () => {
  test('Displays the items count', async ({ page }) => {
    await waitAttributeLoaded(page, 'countitems');

    const value1 = page.locator('[fs-countitems-element="value"][fs-countitems-instance="one"]');
    const value2 = page.locator('[fs-countitems-element="value"][fs-countitems-instance="two"]');

    await expect(value1).toHaveText('35');
    await expect(value2).toHaveText('6');
  });
});
