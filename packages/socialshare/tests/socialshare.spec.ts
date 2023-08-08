import { expect, type Locator, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fs-attributes.webflow.io/socialshare');
});

test.describe('socialshare', () => {
  test('Triggers share correctly', async ({ page, context }) => {
    const facebook1 = page.getByTestId('facebook-1');
    const twitter1 = page.getByTestId('twitter-1');
    const linkedin1 = page.getByTestId('linkedin-1');
    const pinterest1 = page.getByTestId('pinterest-1');
    const telegram1 = page.getByTestId('telegram-1');
    const reddit1 = page.getByTestId('reddit-1');
    const twitter4 = page.getByTestId('twitter-4').first();
    const pinterest4 = page.getByTestId('pinterest-4').first();
    const copy1 = page.getByTestId('copy-1');
    const copy2 = page.getByTestId('copy-2');
    const copy3 = page.getByTestId('copy-3').first();
    const copy4 = page.getByTestId('copy-4').first();
    const currentUrl = await page.url();

    /**
     * Compares the data-url attribute of the passed copy locator with the page url
     * @param copyLocator
     */
    async function checkCopyFunctionality(copyLocator: Locator) {
      const dataUrlAttribute = await copyLocator.getAttribute('data-url');

      await expect(dataUrlAttribute).toEqual(currentUrl);
    }

    await copy1.click();
    checkCopyFunctionality(copy1);

    await copy2.click();
    checkCopyFunctionality(copy2);

    await copy3.click();
    checkCopyFunctionality(copy3);

    await copy4.click();
    checkCopyFunctionality(copy1);

    await facebook1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('facebook'));
    await context.pages()[1].close();

    await twitter1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('twitter'));
    await context.pages()[1].close();

    await linkedin1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('linkedin'));
    await context.pages()[1].close();

    await pinterest1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('pinterest'));
    await context.pages()[1].close();

    await telegram1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('t.me'));
    await context.pages()[1].close();

    await reddit1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('reddit'));
    await context.pages()[1].close();

    await twitter4.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('twitter'));
    await context.pages()[1].close();

    await pinterest4.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('pinterest'));
    await context.pages()[1].close();
  });
});
