import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

const baseUrl = 'https://dev-attributes-cleanurl.webflow.io';

test.describe('cleanurl', () => {
  test('should remove query string from url', async ({ page }) => {
    await page.goto(`${baseUrl}?source=facebook&marketing=true`);
    await waitAttributeLoaded(page, 'cleanurl');

    // remove the slash at the end of the URL
    const currentUrl = page.url().replace(/\/$/, '');

    expect(currentUrl).toBe(baseUrl);
  });
  test('should remove hash from url', async ({ page }) => {
    await page.goto(`${baseUrl}#source-code`);
    await waitAttributeLoaded(page, 'cleanurl');

    // remove the slash at the end of the URL
    const currentUrl = page.url().replace(/\/$/, '');

    expect(currentUrl).toBe(baseUrl);
  });
  test('should remove query string and hash from url', async ({ page }) => {
    await page.goto(`${baseUrl}#source-code?testing=true&thanks=true`);
    await waitAttributeLoaded(page, 'cleanurl');

    // remove the slash at the end of the URL
    const currentUrl = page.url().replace(/\/$/, '');

    expect(currentUrl).toBe(baseUrl);
  });
});
