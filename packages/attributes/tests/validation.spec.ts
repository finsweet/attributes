import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://custom-form-validation-for-webflow-devs.webflow.io/');
});

test.describe('validation', () => {
  test('Errors should be shown', async ({ page }) => {
    await waitAttributeLoaded(page, 'validation');

    const inputField = page.getByTestId('input');
    const errorText = page.getByTestId('error');
    const submitButton = page.getByTestId('submit');

    await expect(errorText).toBeHidden();

    await submitButton.click();

    await expect(errorText).toBeVisible();

    await inputField.type('email@gmail.com');

    await submitButton.click();

    await expect(errorText).toBeHidden();

    await inputField.fill('Random text');

    await submitButton.click();

    await expect(errorText).toBeVisible();
  });
});
