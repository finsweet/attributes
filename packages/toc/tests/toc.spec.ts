import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/toc');
});

test.describe('toc', () => {
  test('Creates the TOC correctly', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['toc', resolve])));

    const tocWrapper1 = page.getByTestId('toc-wrapper-1');
    const contents1 = page.getByTestId('contents-1');

    const h2ID = '#the-best-part-about-h2-elements';
    const h23ID = '#h3-is-one-number-lower-than-h2-2';
    const h235ID = '#im-an-incorrectly-placed-h5';

    // Splits the contents correctly and adds an ID to each section
    const h2Wrapper = contents1.locator(h2ID);
    const h23Wrapper = h2Wrapper.locator(h23ID);
    const h235Wrapper = h2Wrapper.locator(h235ID);

    await expect(h2Wrapper).toBeVisible();
    await expect(h23Wrapper).toBeVisible();
    await expect(h235Wrapper).toBeVisible();

    // Populates the TOC links and adds the IDs to them
    const h2Link = tocWrapper1.locator(`[href="${h2ID}"]`);
    const h23Link = tocWrapper1.locator(`[href="${h23ID}"]`);
    const h235Link = tocWrapper1.locator(`[href="${h235ID}"]`);

    await expect(h2Link).toBeVisible();
    await expect(h23Link).toBeVisible();
    await expect(h235Link).toBeVisible();
  });
});
