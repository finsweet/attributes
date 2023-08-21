import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-whatsapp.webflow.io'); //todo: change to webflow dev url
});

test.describe('whatsapp', () => {
  test('Validates whatsapp anchor tags', async ({ page }) => {
    await page.waitForSelector('a[fs-whatsapp-element="button"]');

    const whatsappButtons = await page.$$('a[fs-whatsapp-element="button"]');

    // Loop through each WhatsApp button
    for (const button of whatsappButtons) {
      const ahref = await button.getAttribute('href');
      if (ahref === '#' || ahref === '') return; // Fail if href is '#'

      const href: URL = ahref as unknown as URL; // Get the 'href' attribute

      // convert href to a URL object
      const url = new URL(href);

      const expectedPhoneNumber = await button.getAttribute('fs-whatsapp-phone'); // Get 'fs-whatsapp-phone' attribute
      const expectedMessage = await button.getAttribute('fs-whatsapp-message'); // Get 'fs-whatsapp-message' attribute

      // Extract phone number and message from the URL
      const urlSearchParams = url.searchParams;
      const phoneNumber = url.pathname.split('/')[0];
      const message = urlSearchParams.get('text');

      // Validate phone number and message using expect
      expect(phoneNumber).toBe(expectedPhoneNumber);
      expect(message).toBe(expectedMessage);

      // Validate nested elements
      const phoneElement = await button.$('[fs-whatsapp-element="phone"]');
      const messageElement = await button.$('[fs-whatsapp-element="message"]');

      if (phoneElement) {
        expect(await phoneElement.textContent()).toBe(phoneNumber);
      }

      if (messageElement) {
        expect(await messageElement.textContent()).toBe(message);
      }
    }
  });
});
