import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/mirrorclick');
});

test.describe('mirrorclick', () => {
  test('Button mirrors clicks on slider', async ({ page }) => {
    await waitAttributeLoaded(page, 'mirrorclick');

    const dots = page.locator('[data-testid="slider"] .w-slider-dot');

    await expect(dots.first()).toHaveClass(/w-active/);

    const richArrorMirrorButton = page.locator('[fs-mirrorclick-element="trigger"][fs-mirrorclick-instance="2"]');
    await richArrorMirrorButton.click();

    await expect(dots.nth(1)).toHaveClass(/w-active/);
  });
});
