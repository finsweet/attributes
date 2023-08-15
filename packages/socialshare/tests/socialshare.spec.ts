import { expect, type Locator, test, webkit } from '@playwright/test';

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

    let currentUrl = await page.url();
    const inputEl = page.getByTestId('input');
    const cmsNextPageButton = page.getByTestId('loadmore');

    /**
     * This function tests the copy url funcyionality
     * @param copySelector Selector of the copy button to be tested
     * @param nextPageTriggered Boolean param to refresh page url if load more button is clicked
     */
    async function testCopyUrl(copySelector: string, nextPageTriggered = false) {
      if (nextPageTriggered) {
        currentUrl = await page.url();
      }

      // Get the copy button instance and click it
      const copyButton = await page.getByTestId(copySelector).first();
      await copyButton.click();

      // focus on the input element to paste
      await inputEl.focus();

      // Simulate paste event using keyboard press
      const isMac = await page.evaluate(() => window.navigator.platform.toString().toLowerCase() === 'macintel');
      const modifier = isMac ? 'Meta' : 'Control';
      await page.keyboard.press(`${modifier}+KeyC`);
      await page.keyboard.press(`${modifier}+KeyV`);

      // Wait for the paste event to be processed
      await page.waitForTimeout(100);

      // Retrieve the input value and check against page url
      const inputValue = await inputEl.evaluate((input) => (input as HTMLInputElement).value);
      await expect(inputValue).toEqual(currentUrl);

      // clear the input field
      await inputEl.fill('');
    }

    await testCopyUrl('copy-1');

    await testCopyUrl('copy-2');

    await testCopyUrl('copy-3');

    await testCopyUrl('copy-4');

    // check copy url functionality on the next page for CMS load more
    await cmsNextPageButton.click();
    await page.waitForLoadState('domcontentloaded');
    await testCopyUrl('copy-1', true);

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
