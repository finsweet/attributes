import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://f-cms-items-by-breakpoint.webflow.io/');
});

test.describe('cmsitems', () => {
  test('Items count should change', async ({ page }) => {
    await waitAttributeLoaded(page, 'cmsitems');

    const wrapper = page.getByTestId('wrapper');

    const xl = (await wrapper.getAttribute('fs-cmsitems-1920')) || '8';

    const numberOfChildren = await wrapper.evaluate((element) => {
      return element.children.length;
    });

    await expect(numberOfChildren).toBe(Number(xl));
  });
});
