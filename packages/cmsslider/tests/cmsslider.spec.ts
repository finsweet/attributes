import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsslider');
});

test.describe('Example', () => {
  test('Example', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsslider', resolve])));
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['cmsload', resolve])));

    const mask1 = page.getByTestId('mask-1');
    const mask2 = page.getByTestId('mask-2');
    const sliderNav1 = page.getByTestId('slider-nav-1');
    const sliderNav2 = page.getByTestId('slider-nav-2');

    // Regular
    expect(await mask1.locator('.w-slide').count()).toBe(5);
    expect(await sliderNav1.locator('.w-slider-dot').count()).toBe(5);

    // CMS Slider + CMS Load
    expect(await mask2.locator('.w-slide').count()).toBe(35);
    expect(await sliderNav2.locator('.w-slider-dot').count()).toBe(35);
  });
});
