import { expect, type Request, type Response, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

const SEARCH_QUERY = 'attribute';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-nativesearch.webflow.io');
  await waitAttributeLoaded(page, 'nativesearch'); // This line causes issues on webkit
});

test.describe('nativesearch', () => {
  test('results wrapper is hidden on page load', async ({ page }) => {
    // get the results element
    const resultsElement = page.locator('form').filter({ hasText: 'Search' }).locator('div');
    // check if the results element is visible
    await expect(resultsElement).toBeHidden();
  });

  test('search is triggered on input and loader elements behaves accordingly', async ({ page }) => {
    // get the input element
    const inputElement = page.getByPlaceholder('Search…');
    // get the loader element
    const loaderElement = page.getByRole('main').locator('img');

    await inputElement.focus();
    await inputElement.type(SEARCH_QUERY);

    // check if the loader element is visible
    page.on('request', async (request) => {
      if (request.url() === `https://dev-attributes-nativesearch.webflow.io/search?query=${SEARCH_QUERY}`)
        await expect(loaderElement).toBeVisible();
    });

    // check if the loader element is hidden
    page.on('response', async (response: Response) => {
      if (response.url() === `https://dev-attributes-nativesearch.webflow.io/search?query=${SEARCH_QUERY}`)
        await expect(loaderElement).toBeHidden();
    });
  });

  test('search is triggered on copy/paste', async ({ page, browserName, context }) => {
    // Grant permissions for Chromium and WebKit
    if (browserName !== 'firefox') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    // get the input element
    const inputElement = page.getByPlaceholder('Search…');
    // get the loader element
    const loaderElement = page.getByRole('main').locator('img');

    const isMac = false;
    const modifier = isMac ? 'Meta' : 'Control';

    await page.evaluate(`navigator.clipboard.writeText('${SEARCH_QUERY}')`);

    await inputElement.focus();
    await page.keyboard.press(`${modifier}+v`);

    // check if the loader element is visible
    page.on('request', async (request) => {
      if (request.url() === `https://dev-attributes-nativesearch.webflow.io/search?query=${SEARCH_QUERY}`)
        await expect(loaderElement).toBeVisible();
    });

    // check if the loader element is hidden
    page.on('response', async (response: Response) => {
      if (response.url() === `https://dev-attributes-nativesearch.webflow.io/search?query=${SEARCH_QUERY}`)
        await expect(loaderElement).toBeHidden();
    });
  });

  test('Search results container is displayed after request finished', async ({ page }) => {
    const inputElement = page.getByPlaceholder('Search…');

    await inputElement.focus();
    await inputElement.type(SEARCH_QUERY);

    const resultsElement = page.locator('.search_results');
    await resultsElement.waitFor({ state: 'visible' });

    const results = page.locator('.search-result-items > div');

    expect(await results.count()).toBeTruthy();
  });
});
