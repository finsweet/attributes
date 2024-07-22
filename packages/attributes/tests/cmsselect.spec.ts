import { expect, type Locator, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmsselect');
});

test.describe('cmsselect', () => {
  test.skip('Populates options from lists', async ({ page }) => {
    const select1 = page.getByTestId('select-1');
    const select2 = page.getByTestId('select-2');
    const select3 = page.getByTestId('select-3');

    await waitAttributeLoaded(page, 'cmsload');

    expect(await getOptionsLength(select1)).toBe(6);
    expect(await getOptionsLength(select2)).toBe(36);
    expect(await getOptionsLength(select3)).toBe(6);
  });
});

const getOptionsLength = (select: Locator) =>
  select.evaluate<number, HTMLSelectElement>(({ options }) => options.length);
