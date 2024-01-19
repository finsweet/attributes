import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/socialshare');

  await waitAttributeLoaded(page, 'socialshare');
});

test.describe('socialshare', () => {
  test('Triggers copy URL correctly', async ({ page }) => {
    const inputEl = page.getByTestId('input');
    const currentUrl = page.url();

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

  test('Triggers share to social media correctly', async ({ page, context }) => {
    const socialMediaSites = ['facebook', 'twitter', 'linkedin', 'pinterest', 't.me', 'reddit'];

    const triggersValidPopups = async (sites: string[]) => {
      for (const site of sites) {
        const identifier = site === 't.me' ? 'telegram' : site;

        const element = page.getByTestId(`${identifier}-1`);
        await element.click();

        await context.waitForEvent('page', (p) => p.url().includes(site));
        await context.pages()[1].close();
      }
    };

    await triggersValidPopups(socialMediaSites);
  });
});
