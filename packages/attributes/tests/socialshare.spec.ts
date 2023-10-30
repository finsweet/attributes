import { expect, type Locator, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/socialshare');

  await waitAttributeLoaded(page, 'socialshare');

  await page.waitForLoadState('domcontentloaded');
});

test.describe('socialshare', () => {
  test('Triggers copy URL correctly', async ({ page }) => {
    const inputEl = page.getByTestId('input');
    const currentUrl = await page.url();

    const options = ['copy'];

    for (const option of options) {
      const elements = await page.locator(`[fs-socialshare-element="${option}"]`).all();

      for (const element of elements) {
        expect(element).toBeTruthy();

        if (option === 'copy') {
          await element.click();

          // focus on the input element to paste
          await inputEl.focus();

          // Simulate paste event using keyboard press
          const isMac = await page.evaluate(() => window.navigator.platform.toString().toLowerCase() === 'macintel');
          const modifier = isMac ? 'Meta' : 'Control';
          await page.keyboard.press(`${modifier}+KeyC`);
          await page.keyboard.press(`${modifier}+KeyV`);

          await page.waitForTimeout(100);

          // Retrieve the input value and check against page url
          const inputValue = await inputEl.evaluate((input) => (input as HTMLInputElement).value);
          await expect(inputValue).toEqual(currentUrl);

          // clear the input field
          await inputEl.fill('');

          continue;
        }
      }
    }
  });

  test('Triggers share to social media correctly', async ({ page }) => {
    const facebook1 = page.getByTestId('facebook-1');
    const twitter1 = page.getByTestId('twitter-1');
    const linkedin1 = page.getByTestId('linkedin-1');
    const pinterest1 = page.getByTestId('pinterest-1');
    const telegram1 = page.getByTestId('telegram-1');
    const reddit1 = page.getByTestId('reddit-1');

    const triggersValidPopup = async (text: string, element: Locator) => {
      await element.click();

      const context = await page.context();

      await context.waitForEvent('page', (p) => p.url().includes(text));
      await context.pages()[1].close();
    };

    await triggersValidPopup('facebook', facebook1);
    await triggersValidPopup('twitter', twitter1);
    await triggersValidPopup('linkedin', linkedin1);
    await triggersValidPopup('pinterest', pinterest1);
    await triggersValidPopup('t.me', telegram1);
    await triggersValidPopup('reddit', reddit1);
  });
});
