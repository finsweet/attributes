import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-countdown.webflow.io/');
});

test.describe('countdown', () => {
  test('Elements should be hidden', async ({ page }) => {
    const hideElement = page.getByTestId('hidden');
    await hideElement.evaluate((element) => {
      element.setAttribute('fs-countdown-date', 'December 1, 2020 09:30:00');
    });
    await waitAttributeLoaded(page, 'countdown');
    const showElement = page.getByTestId('visible');
    await expect(showElement).toBeVisible();
    await expect(hideElement).toBeHidden();
  });
});
