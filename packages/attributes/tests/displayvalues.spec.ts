import { expect, type Page, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/displayvalues');
});

const getSourceLocators = (page: Page) =>
  [1, 2, 3, 4, 5, 6].map((id) =>
    page.locator(`[fs-displayvalues-element="source"][fs-displayvalues-instance="${id}"]`)
  );

const getTargetLocators = (page: Page) =>
  [1, 2, 3, 4, 5, 6].map((id) =>
    page.locator(`[fs-displayvalues-element="target"][fs-displayvalues-instance="${id}"]`)
  );

test.describe('displayvalues', () => {
  test("Displays each element's value", async ({ page }) => {
    await waitAttributeLoaded(page, 'displayvalues');

    const [source1, source2, source3, source4, source5, source6] = getSourceLocators(page);
    const [target1, target2, target3, target4, target5, target6] = getTargetLocators(page);

    await source1.type('source 1');
    await expect(target1).toHaveText('source 1');

    await source2.type('source 2');
    await expect(target2).toHaveText('source 2');

    await source3.selectOption('First');
    await expect(target3).toHaveText('First');

    await source4.check({ force: true });
    await expect(target4).toHaveText('true');

    await source5.first().check({ force: true });
    await expect(target5).toHaveText('Radio');

    await source6.evaluate<void, HTMLInputElement>((input) => {
      input.value = '70';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await expect(target6).toHaveText('70');
  });
});
