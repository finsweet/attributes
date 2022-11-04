import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsattribute');
});

test.describe('cmsattribute', () => {
  test('Sets attributes correctly', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsattribute', resolve])));

    const lionImage = page.locator('[fs-cmsattribute-target="slider-data"]');
    await expect(lionImage).toHaveAttribute('some-attribute-out-of-specification', 'Picture of a lion');

    const cmsLoadImages = page.locator('[fs-cmsattribute-target="title"]');
    await expect(cmsLoadImages.first()).toHaveAttribute('sl-slider-title', 'Project 35');

    const cmsImages = page.locator('[fs-cmsattribute-target="description"]');
    await expect(cmsImages.first()).toHaveAttribute('description', 'sl-slider-description');
  });
});
