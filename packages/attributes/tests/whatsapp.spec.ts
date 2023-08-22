import { type ElementHandle, expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

let whatsappButtons: ElementHandle<HTMLAnchorElement>[] = [];

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-whatsapp.webflow.io');
  await waitAttributeLoaded(page, 'whatsapp');

  // Get all whatsapp buttons
  whatsappButtons = (await page.$$('a[fs-whatsapp-element="button"]')) as ElementHandle<HTMLAnchorElement>[];
});

test.describe('whatsapp', () => {
  // Static attributes test
  test('Validates static attributes for whatsapp anchor tags', async () => {
    // Loop through all whatsapp buttons and validate the attributes
    for (const button of whatsappButtons) {
      const { phoneNumber, message } = await getAttributes(button);

      const expectedPhoneNumber = await button.getAttribute('fs-whatsapp-phone');
      const expectedMessage = await button.getAttribute('fs-whatsapp-message');

      // Assert that the attributes are not empty
      if (expectedPhoneNumber && expectedMessage) {
        expect(phoneNumber).toBe(expectedPhoneNumber);
        expect(message).toBe(expectedMessage);
      }
    }
  });

  // Dynamic attributes test
  test('Validates dynamic attributes for whatsapp anchor tags', async () => {
    // Loop through all whatsapp buttons and validate the attributes
    for (const button of whatsappButtons) {
      // Get the attributes from the whatsapp button
      const { phoneNumber, message } = await getAttributes(button);

      const phoneElement: ElementHandle<Element> | null = await button.$('div[fs-whatsapp-element="phone"]');
      const messageElement: ElementHandle<Element> | null = await button.$('div[fs-whatsapp-element="message"]');

      // Assert that the attributes are not empty
      if (phoneElement && messageElement) {
        const dynamicMessage = (await messageElement.textContent()) ?? '';
        expect(dynamicMessage).toBeTruthy();

        const dynamicPhone = (await phoneElement.textContent()) ?? '';
        expect(dynamicPhone).toBeTruthy();

        expect(dynamicPhone).toBe(phoneNumber);
        expect(dynamicMessage).toBe(message);
      }
    }
  });
});

/**
 * Helper function that gets the attributes from a whatsapp button
 * @param button The whatsapp button
 * @returns An object containing the phone number and message
 */
async function getAttributes(button: ElementHandle<HTMLAnchorElement>) {
  const href = (await button.getAttribute('href')) ?? '';
  expect(href).toBeTruthy();

  // assert that the href value is a valid whatsapp link
  expect(href).toContain('https://wa.me/');

  const url = new URL(href);
  const [, phoneNumber] = url.pathname.split('/');
  const message = url.searchParams.get('text');

  return { phoneNumber, message };
}
