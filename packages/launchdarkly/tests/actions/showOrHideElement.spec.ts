import { expect, test } from '@playwright/test';

test.describe('InitFlagElement for showIf attribute', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('packages/launchdarkly/tests/fixtures/showOrHideElement');
  });

  test.describe('Hide Element', async () => {
    test('when flag does not exist', async ({ page }) => {
      const flags = `{}`;
      const selector = '[data-test-id="title1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).not.toBeVisible();
    });

    test('when flag value is not matched', async ({ page }) => {
      const flags = `{testing:"value"}`;
      const selector = '[data-test-id="title1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).not.toBeVisible();
    });
  });

  test.describe('Show Element', async () => {
    test('when flag exists and it is equal', async ({ page }) => {
      const flags = `{testing:"value1"}`;
      const selector = `[data-test-id="title1"]`;
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).toBeVisible();
    });

    test('when flag exists and it is equal one of the comma separated values', async ({ page }) => {
      const flags = `{testing:"value2"}`;
      const selector = `[data-test-id="title2"]`;
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).toBeVisible();
    });

    test('when flag is boolean and fs-launchdarkly-showif="false"', async ({ page }) => {
      const flags = `{testing:false}`;
      const selector = '[data-test-id="title-boolean"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).toBeVisible();
    });
  });
});
