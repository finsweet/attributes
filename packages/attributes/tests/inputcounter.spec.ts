import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/inputcounter');
});

test.describe('inputcounter', () => {
  test('Initial + step, min, max + increment, decrement, reset', async ({ page }) => {
    await waitAttributeLoaded(page, 'inputcounter');

    const input = page.locator('[fs-inputcounter-element="input"][fs-inputcounter-instance="4"]');
    const incrementButton = page.locator('[fs-inputcounter-element="increment"][fs-inputcounter-instance="4"]');
    const decrementButton = page.locator('[fs-inputcounter-element="decrement"][fs-inputcounter-instance="4"]');
    const resetBtn = page.locator('[fs-inputcounter-element="reset"][fs-inputcounter-instance="4"]');
    const clearBtn = page.locator('[fs-inputcounter-element="clear"][fs-inputcounter-instance="4"]');

    let resetButton;

    if (await resetBtn.isVisible()) {
      resetButton = resetBtn;
    }

    if (await clearBtn.isVisible()) {
      resetButton = clearBtn;
    }

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
    if (resetButton) {
      // Reset to initial
      await resetButton?.click();
      await expect(input).toHaveValue('0.5');
    } else {
      // If no reset button is found, fail the test
      expect(false).toBe(true);
    }
  });

  test('Change reset button attribute value from reset to clear is backward compatible', async ({ page }) => {
    await waitAttributeLoaded(page, 'inputcounter');

    const clearButtons = page.locator('[fs-inputcounter-element^="clear"]');
    const resetButtons = page.locator('[fs-inputcounter-element^="reset"]');

    const countClearButtons = await clearButtons.count();
    const countResetButtons = await resetButtons.count();

    const eitherIsGreaterThanZero = countClearButtons > 0 || countResetButtons > 0;

    expect(eitherIsGreaterThanZero).toBe(true);
  });
});
