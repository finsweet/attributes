import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/inputcounter');
});

test.describe('inputcounter', () => {
  test('Initial + step, min, max + increment, decrement, reset', async ({ page }) => {
    const input = page.getByTestId('input');
    const incrementButton = page.getByTestId('increment');
    const decrementButton = page.getByTestId('decrement');
    const resetButton = page.getByTestId('reset');

    // Initial
    await expect(input).toHaveValue('0.5');

    // Min
    await input.fill('-1');
    await input.dispatchEvent('change');
    await expect(input).toHaveValue('0');

    // Max
    await input.fill('11');
    await input.dispatchEvent('change');
    await expect(input).toHaveValue('10');

    // Step
    await input.fill('0.65');
    await input.dispatchEvent('change');
    await expect(input).toHaveValue('0.5');

    await input.fill('0.95');
    await input.dispatchEvent('change');
    await expect(input).toHaveValue('1');

    // Increment
    await incrementButton.click();
    await expect(input).toHaveValue('1.5');

    // Decrement
    await decrementButton.click();
    await expect(input).toHaveValue('1');

    // Reset
    await resetButton.click();
    await expect(input).toHaveValue('0.5');
  });
});
