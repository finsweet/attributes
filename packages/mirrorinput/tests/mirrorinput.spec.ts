import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/mirrorinput');
});

const getTriggerLocators = (page: Page) =>
  [1, 2, 3, 4, 5].map((id) => page.locator(`[fs-mirrorinput-element="trigger-${id}"]`));

const getTargetLocators = (page: Page) =>
  [1, 2, 3, 4, 5].map((id) => page.locator(`[fs-mirrorinput-element="target-${id}"]`));

test.describe('mirrorinput', () => {
  test("Mirrors each trigger's input", async ({ page }) => {
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
