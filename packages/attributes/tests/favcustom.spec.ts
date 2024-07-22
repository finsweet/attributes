import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/favcustom');
});

test.describe('favcustom', () => {
  test('Favicon is updated', async ({ page }) => {
    await waitAttributeLoaded(page, 'favcustom');

    const sourceElement = page.getByTestId('src');
    const sourceElementSrc = await sourceElement.getAttribute('src');

    const pageFavicon = await page.evaluate(() => {
      const linkElement = document.querySelector<HTMLLinkElement>('link[type="image/x-icon"]');
      return linkElement?.href;
    });

    expect(pageFavicon).toBe(sourceElementSrc);
  });
});
