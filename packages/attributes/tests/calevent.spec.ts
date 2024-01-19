import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-calevent.webflow.io');
  await waitAttributeLoaded(page, 'calevent');
});

test.describe('calevent', () => {
  // Google
  test('Triggers Google Calendar event correctly', async ({ page }) => {
    // Get all google buttons
    const googleButtons = await page.$$('[fs-calevent-element="google"]');

    // Loop through all google buttons and click them
    for (const googleButton of googleButtons) {
      await googleButton.click();
      // wait for the new page to open and log the url
      const p = await page.context().waitForEvent('page', (p) => p.url().includes('google'));
      expect(p.url()).toContain('google.com/products/calendar');
    }
  });

  // Outlook
  test('Triggers Outlook Calendar event correctly', async ({ page }) => {
    const outlookButtons = await page.$$('[fs-calevent-element="outlook"]');

    // Loop through all outlook buttons and click them
    for (const outlookButton of outlookButtons) {
      await outlookButton.click();
      // wait for the new page to open and log the url
      const p = await page.context().waitForEvent('page', (p) => p.url().includes('outlook'));
      // console.log(p.url());
      expect(p.url()).toContain('https://outlook.live.com/calendar/');
    }
  });

  // ICS
  test('Triggers ICS Calendar event correctly', async ({ page, browserName }) => {
    const appleButtons = await page.$$('[fs-calevent-element="apple"]');

    // Loop through all apple buttons and click them
    for (const appleButton of appleButtons) {
      // on click, the browser downloads a .ics file. Test that the file is downloaded
      const [download] = await Promise.all([page.waitForEvent('download'), appleButton.click()]);

      // assert that the suggested filename is download.ics on chrome browser
      switch (browserName) {
        case 'chromium':
          expect(download.suggestedFilename()).toBe('download.ics');
          break;
        default:
          expect(await download.path()).toBeTruthy();
          break;
      }
    }
  });
});
