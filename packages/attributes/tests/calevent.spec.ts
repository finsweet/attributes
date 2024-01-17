import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-calevent.webflow.io');
  await waitAttributeLoaded(page, 'calevent');
});

test.describe('calevent', () => {
  // Google
  test('Triggers Google Calendar event correctly', async ({ page }) => {
    const googleButtons = await page.locator('[fs-calevent-element="google"]').all();

    const [button] = googleButtons;

    await button.click({
      force: true,
      button: 'left',
    });

    await page.context().waitForEvent('page');

    // all new tabs pages opened
    const pages = await page.context().pages();

    expect(pages.length).toBe(2);

    // get new pages instance urls
    const urls = pages.map((p) => p.url());

    const triggeredCalendar = urls.some((url) => url.indexOf('google.com') !== -1);
    await expect(triggeredCalendar).toBeTruthy();
  });

  // Outlook
  test('Triggers Outlook Calendar event correctly', async ({ page }) => {
    const buttons = await page.locator('[fs-calevent-element="outlook"]').all();

    const [button] = buttons;

    await button.click({
      force: true,
      button: 'left',
    });

    await page.context().waitForEvent('page');

    // all new tabs pages opened
    const pages = await page.context().pages();

    // get new pages instance urls
    const urls = pages.map((p) => p.url());

    const triggeredCalendar = urls.some((url) => url.indexOf('outlook.live') !== -1);
    await expect(triggeredCalendar).toBeTruthy();
  });

  // ICS
  test('Triggers ICS Calendar event correctly', async ({ page, browserName }) => {
    const buttons = await page.locator('[fs-calevent-element="apple"]').all();

    const [button] = buttons;

    // Start waiting for download before clicking: https://playwright.dev/docs/api/class-page#page-wait-for-event
    const downloadPromise = page.waitForEvent('download');

    await button.click({
      force: true,
      button: 'left',
    });

    // on click, the browser downloads a .ics file. Test that the file is downloaded
    const download = await downloadPromise;

    // assert that the suggested filename is download.ics on chrome browser
    switch (browserName) {
      case 'chromium':
        expect(download.suggestedFilename()).toBe('download.ics');
        break;
      default:
        expect(await download.path()).toBeTruthy();
        break;
    }
  });
});
