import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-inheritclass.webflow.io/');
});

test.describe('inheritclass', () => {
  test('Checkmark inherits class', async ({ page }) => {
    await waitAttributeLoaded(page, 'inheritclass');

    const listener = page.getByTestId('listener');
    const checkmark = page.getByTestId('checkmark');

    const className = (await listener.getAttribute('fs-inheritclass-listener')) || '';

    await listener.evaluate((element, className) => {
      element.classList.add(className);
    }, className);

    await expect(checkmark).toBeVisible();
  });
});
