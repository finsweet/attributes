import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/component');
});

test.describe('component', () => {
  test('Loads same-project components', async ({ page }) => {
    await waitAttributeLoaded(page, 'component');

    const target1 = page.getByTestId('target-1');
    const target2 = page.getByTestId('target-2');

    await expect(target1).not.toBeEmpty();
    await expect(target2).not.toBeEmpty();
  });

  test('Loads external-project components', async ({ page }) => {
    await waitAttributeLoaded(page, 'component');

    const target3 = page.getByTestId('target-3');
    const target4 = page.getByTestId('target-4');

    // Components are rendered
    const target3Component = target3.locator('[fs-component-element="component"]');
    const target4Component = target4.locator('[fs-component-element="component"]');

    await expect(target3Component).toBeVisible();
    await expect(target4Component).toBeVisible();

    // External CSS is loaded when css is true
    const target3CSS = target3.locator('link[type="text/css"]');
    const target4CSS = target4.locator('link[type="text/css"]');

    await expect(target3CSS).toHaveCount(1);
    await expect(target4CSS).toHaveCount(0);
  });
});
