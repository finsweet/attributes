import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-masonry.webflow.io/');
});

test.describe('masonry', () => {
  test('Item should be absolute', async ({ page }) => {
    await waitAttributeLoaded(page, 'masonry');

    const item = page.getByTestId('item');

    const isAbsolute = await item.nth(0)?.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.position === 'absolute';
    });

    expect(isAbsolute).toBe(true);
  });
});
