import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-tooltip.webflow.io/');
});

test.describe('tooltip', () => {
  test('Tooltip shows and hides', async ({ page }) => {
    await waitAttributeLoaded(page, 'tooltip');

    const target = page.locator('[fs-tooltip-element="target"]').first();
    const tooltip = target.locator('[fs-tooltip-element="tooltip"]');

    // tooltip to be hidden initially
    expect(await tooltip.isVisible()).toBe(false);

    // trigger mouse hover
    await target.hover();

    await page.waitForTimeout(1000);

    // tooltip to show
    expect(await tooltip.isVisible()).toBe(true);

    // move mouse away
    await page.mouse.move(100, 100);

    await page.waitForTimeout(1000);

    // tooltip to hide
    expect(await tooltip.isVisible()).toBe(false);
  });
});
