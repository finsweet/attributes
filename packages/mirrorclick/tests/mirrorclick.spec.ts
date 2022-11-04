import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/mirrorclick');
});

test.describe('mirrorclick', () => {
  test('Button mirrors clicks on slider', async ({ page }) => {
    const dots = page.locator('[data-testid="slider"] .w-slider-dot');

    await expect(dots.first()).toHaveClass(/w-active/);

    const richArrorMirrorButton = page.locator('[fs-mirrorclick-element="trigger-2"]');
    await richArrorMirrorButton.click();

    await expect(dots.nth(1)).toHaveClass(/w-active/);
  });
});
