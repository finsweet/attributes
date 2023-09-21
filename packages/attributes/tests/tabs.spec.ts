import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-tabs.webflow.io/');
});

test.describe('tabs', () => {
  test('Switch from one tab to another', async ({ page }) => {
    await waitAttributeLoaded(page, 'tabs');

    const greenTab = page.getByTestId('green');
    const purpleTab = page.getByTestId('purple');
    const purpleBtn = page.getByTestId('purple-btn');
    const greenBtn = page.getByTestId('green-btn');

    await expect(greenTab).toBeVisible();
    await expect(purpleTab).toBeHidden();

    await purpleBtn.click();

    await expect(purpleTab).toBeVisible();
    await expect(greenTab).toBeHidden();

    await greenBtn.click();

    await expect(greenTab).toBeVisible();
    await expect(purpleTab).toBeHidden();
  });
});
