import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-favorite.webflow.io/');
});

test.describe('favorite', () => {
  test('Loader should be hidden', async ({ page }) => {
    await waitAttributeLoaded(page, 'favorite');

    const loader = page.getByTestId('loader');

    await expect(loader).toBeHidden();
  });

  test('List should be empty', async ({ page }) => {
    await waitAttributeLoaded(page, 'favorite');

    const list = page.getByTestId('list-favorite');

    const childCount = await list.evaluate((element) => element.children.length);
    expect(childCount).toBe(0);
  });

  test('Like adds element to store', async ({ page }) => {
    await waitAttributeLoaded(page, 'favorite');

    const likeButton = page.getByTestId('like');

    await likeButton.nth(0).click();

    await expect(likeButton.nth(0)).toHaveClass(/is-active/);
  });
});
