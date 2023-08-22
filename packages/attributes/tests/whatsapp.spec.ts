import { type ElementHandle, expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-whatsapp.webflow.io');
});

// reusable function to get common attributes and logs
async function getAttributesAndLogs(button: ElementHandle<HTMLAnchorElement>) {
  const ahref = (await button.getAttribute('href')) ?? '';
  expect(ahref).toBeTruthy();
  expect(ahref).toContain('https://wa.me/');

  const url = new URL(ahref);
  const [, phoneNumber] = url.pathname.split('/');
  const message = url.searchParams.get('text');

  return { phoneNumber, message };
}

test.describe('whatsapp', () => {
  test('Validates static attributes for whatsapp anchor tags', async ({ page }) => {
    await waitAttributeLoaded(page, 'whatsapp');
    const whatsappButtons = (await page.$$('a[fs-whatsapp-element="button"]')) as ElementHandle<HTMLAnchorElement>[];

    for (const button of whatsappButtons) {
      const { phoneNumber, message } = await getAttributesAndLogs(button);

      const expectedPhoneNumber = await button.getAttribute('fs-whatsapp-phone');
      const expectedMessage = await button.getAttribute('fs-whatsapp-message');

      if (expectedPhoneNumber && expectedMessage) {
        expect(phoneNumber).toBe(expectedPhoneNumber);
        expect(message).toBe(expectedMessage);
      }
    }
  });

  test('Validates dynamic attributes for whatsapp anchor tags', async ({ page }) => {
    await waitAttributeLoaded(page, 'whatsapp');
    const whatsappButtons = (await page.$$('a[fs-whatsapp-element="button"]')) as ElementHandle<HTMLAnchorElement>[];

    for (const button of whatsappButtons) {
      const { phoneNumber, message } = await getAttributesAndLogs(button);

      const phoneElement: ElementHandle<Element> | null = await button.$('div[fs-whatsapp-element="phone"]');
      const messageElement: ElementHandle<Element> | null = await button.$('div[fs-whatsapp-element="message"]');

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
