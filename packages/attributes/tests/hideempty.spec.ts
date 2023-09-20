import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-hideempty.webflow.io/');
});

test.describe('hideempty', () => {
  test('Hide one element and show another', async ({ page }) => {
    await waitAttributeLoaded(page, 'hideempty');

    const list = page.getByTestId('list');
    const hideElement = page.getByTestId('hide');
    const visibleElement = page.getByTestId('visible');

    await list.evaluate((element) => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });

    await expect(hideElement).toBeHidden();
    await expect(visibleElement).toBeVisible();
  });
});
