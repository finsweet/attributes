import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/selectcustom');
  // eslint-disable-next-line no-console
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
});

test.describe('selectcustom', () => {
  test('selectcustom initializes properly', async ({ page }) => {
    await waitAttributeLoaded(page, 'selectcustom');

    const selectcustomDropdown = page.locator('[fs-selectcustom-element="dropdown"]');
    const selectcustomClearSelection = page.locator('[fs-selectcustom-element="clear"]');
    const selectcustomClearSelectionFallback = page.locator('[fs-selectcustom-element="option-reset"]');
    const selectcustomLabel = page.locator('[fs-selectcustom-element="label"]');

    // selectcustom element to exist
    await expect(selectcustomDropdown).toHaveCount(1);
    // selectcustom element to be visible
    await expect(selectcustomDropdown).toBeVisible();
    // label to exist
    await expect(selectcustomLabel).toHaveCount(1);

    // clear selection button count default
    const countDefault = await selectcustomClearSelection.count();
    if (countDefault > 0) {
      // clear selection button to be exist
      await expect(selectcustomClearSelection).toHaveCount(1);

      return;
    }

    // clear selection button count fallback
    const countFallback = await selectcustomClearSelectionFallback.count();
    if (countFallback > 0) {
      // clear selection button fallback to exist
      await expect(selectcustomClearSelectionFallback).toHaveCount(1);

      return;
    }

    // a way to fail the test if both if checks failed
    const eitherExists = countDefault > 0 || countFallback > 0;

    // this should fail in the end since above if checks failed.
    expect(eitherExists).toBeTruthy();
  });
});
