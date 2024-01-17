import { expect, type Page, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/mirrorinput');
});

const getTriggerLocators = (page: Page) =>
  ['one', 'two', 'three', 'four', 'five'].map((id) =>
    page.locator(`[fs-mirrorinput-element="trigger"][fs-mirrorinput-instance="${id}"]`)
  );

const getTargetLocators = (page: Page) =>
  ['one', 'two', 'three', 'four', 'five'].map((id) =>
    page.locator(`[fs-mirrorinput-element="target"][fs-mirrorinput-instance="${id}"]`)
  );

test.describe('mirrorinput', () => {
  test("Mirrors each trigger's input", async ({ page }) => {
    await waitAttributeLoaded(page, 'mirrorinput');

    const [trigger1, trigger2, trigger3, trigger4, trigger5] = getTriggerLocators(page);
    const [target1, target2, target3, target4, target5] = getTargetLocators(page);

    await trigger1.type('trigger 1');
    await expect(target1).toHaveValue('trigger 1');

    await trigger2.type('trigger 2');
    await expect(target2).toHaveValue('trigger 2');

    await trigger3.selectOption('First');
    await expect(target3).toHaveValue('First');

    await trigger4.check({ force: true });
    await expect(target4).toBeChecked();

    await trigger5.first().check({ force: true });
    await expect(target5.first()).toBeChecked();
  });
});
