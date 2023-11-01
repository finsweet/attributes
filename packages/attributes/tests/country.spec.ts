import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-country.webflow.io/');
});

test.describe('country', () => {
  test('Code should be updated', async ({ page }) => {
    const initialCallingCode = await page.getByTestId('calling-code').innerHTML();
    await waitAttributeLoaded(page, 'country');
    const updatedCallingCode = await page.getByTestId('calling-code').innerHTML();
    expect(initialCallingCode).not.toEqual(updatedCallingCode);
  });

  test('Name should be updated', async ({ page }) => {
    const initialFullName = await page.getByTestId('full-name').innerHTML();
    await waitAttributeLoaded(page, 'country');
    const updatedFullName = await page.getByTestId('full-name').innerHTML();
    expect(initialFullName).not.toEqual(updatedFullName);
  });
});
