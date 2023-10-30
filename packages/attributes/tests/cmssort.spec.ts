import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/cmssort');
});

test.describe('cmssort', () => {
  test('Sorts correctly', async ({ page }) => {
    await waitAttributeLoaded(page, 'cmsload');
    await waitAttributeLoaded(page, 'cmssort');

    // HTML Select Dropdown
    // need to pick the first index since locator will resolve to multiple elements of the same attribute
    // the first should not have any instance hence index 0
    const trigger1 = (await page.locator('[fs-cmssort-element="trigger"]').all())[0];
    const list1 = (await page.locator('[fs-cmssort-element="list"]').all())[0];
    const listItems1 = list1.locator('.w-dyn-item');

    await expect(listItems1.first()).toHaveText(/Project 35/);

    await trigger1.selectOption('name');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 1/);

    await trigger1.selectOption('name-desc');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 35/);

    await trigger1.selectOption('year');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 31/);

    await trigger1.selectOption('year-desc');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 24/);

    await trigger1.selectOption('number');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 31/);

    await trigger1.selectOption('number-desc');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 3/);

    await trigger1.selectOption('number-string');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 22/);

    await trigger1.selectOption('number-string-desc');
    await page.waitForTimeout(500);
    await expect(listItems1.first()).toHaveText(/Project 33/);

    // Buttons
    const triggers2 = page.locator('[fs-cmssort-element="trigger"][fs-cmssort-instance="2"]');
    const nameTrigger = triggers2.nth(0);
    const yearTrigger = triggers2.nth(1);
    const numberTrigger = triggers2.nth(3);
    const list2 = page.locator('[fs-cmssort-element="list"][fs-cmssort-instance="2"]');
    const listItems2 = list2.locator('.w-dyn-item');

    await expect(listItems2.first()).toHaveText(/Project 35/);

    await nameTrigger.click();
    await expect(nameTrigger).toHaveClass(/fs-cmssort_desc/);
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 35/);

    await nameTrigger.click();
    await expect(nameTrigger).toHaveClass(/fs-cmssort_asc-cool/);
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 1/);

    await yearTrigger.click();
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 11/);

    await yearTrigger.click();
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 4/);

    await numberTrigger.click();
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 31/);

    await numberTrigger.click();
    await page.waitForTimeout(500);
    await expect(listItems2.first()).toHaveText(/Project 3/);
  });
});
