/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/numbercount');
});

test.describe('Animates the numbers', () => {
  test('Picks the end value and duration and animates it', async ({ page }) => {
    const numberElement = page.getByTestId('number-1');
    const rawEnd = (await numberElement.getAttribute('fs-numbercount-end'))!;
    const rawDuration = await numberElement.getAttribute('fs-numbercount-duration');

    const duration = Number(rawDuration);

    await page.waitForTimeout(duration);

    await expect(numberElement).toHaveText(rawEnd);
  });
});
